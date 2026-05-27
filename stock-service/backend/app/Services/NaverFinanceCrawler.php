<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class NaverFinanceCrawler
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'timeout' => 10,
            'headers' => [
                'User-Agent'      => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept'          => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language' => 'ko-KR,ko;q=0.9,en;q=0.8',
                'Referer'         => 'https://finance.naver.com/',
            ],
        ]);
    }

    public function getStockInfo(string $code): array
    {
        return Cache::remember("stock:{$code}", 60, fn () => $this->fetchStockInfo($code));
    }

    // 검색은 로컬 DB 기반 (StockController에서 직접 처리)
    // 하위 호환을 위해 남겨둠 — 실제 사용되지 않음
    public function searchStocks(string $query): array
    {
        return [];
    }

    public function getChartData(string $code, string $timeframe = 'day'): array
    {
        $ttl = match ($timeframe) {
            'week'  => 300,
            'month' => 3600,
            default => 60,
        };

        return Cache::remember("chart:{$code}:{$timeframe}", $ttl, fn () => $this->fetchChartData($code, $timeframe));
    }

    private function fetchStockInfo(string $code): array
    {
        try {
            $html = (string) $this->client->get(
                "https://finance.naver.com/item/main.naver?code={$code}"
            )->getBody();

            $crawler = new Crawler($html);

            // 종목명
            $name = trim($crawler->filter('.wrap_company h2 a')->first()->text(''));

            // dl.blind dd 텍스트에서 파싱 — 가장 안정적인 구조
            $fields = [];
            $crawler->filter('dl.blind dd')->each(function (Crawler $node) use (&$fields) {
                $text = preg_replace('/\s+/', ' ', trim($node->text('')));
                foreach ([
                    '현재가', '전일가', '시가', '고가', '저가', '거래량', '거래대금', '상한가', '하한가',
                ] as $key) {
                    if (str_starts_with($text, $key . ' ')) {
                        $fields[$key] = substr($text, \strlen($key) + 1);
                    }
                }
                // 현재가 라인: "현재가 307,000 전일대비 상승 8,000 플러스 2.68 퍼센트"
                if (str_starts_with($text, '현재가 ')) {
                    $fields['_raw_today'] = $text;
                }
            });

            $price        = $this->parseNumber($fields['현재가'] ?? '');
            $open         = $this->parseNumber($fields['시가'] ?? '');
            $high         = $this->parseNumber($fields['고가'] ?? '');
            $low          = $this->parseNumber($fields['저가'] ?? '');
            $volume       = $this->parseNumber($fields['거래량'] ?? '');
            $prevClose    = $this->parseNumber($fields['전일가'] ?? '');
            $changeAmount = $price - $prevClose;
            $change       = $prevClose > 0 ? round($changeAmount / $prevClose * 100, 2) : 0.0;

            // 등락률 검증: dl.blind에서 직접 읽기
            if (isset($fields['_raw_today'])) {
                preg_match('/(\d+\.\d+)\s*퍼센트/', $fields['_raw_today'], $m);
                if ($m) {
                    $rateFromPage = (float) $m[1];
                    if (str_contains($fields['_raw_today'], '하락')) {
                        $rateFromPage  = -$rateFromPage;
                        $changeAmount  = -abs($changeAmount);
                    }
                    $change = $rateFromPage;
                }
            }

            // 시가총액 (억원) — em#_market_sum 텍스트에서 숫자만 추출
            $marketCapNode = $crawler->filter('#_market_sum');
            $marketCap     = null;
            if ($marketCapNode->count() > 0) {
                $rawCap    = preg_replace('/[^0-9,]/', '', $marketCapNode->text(''));
                $marketCap = $rawCap !== '' ? (int) str_replace(',', '', $rawCap) : null;
            }

            return [
                'code'         => $code,
                'name'         => $name,
                'price'        => $price,
                'changeAmount' => $changeAmount,
                'change'       => $change,
                'open'         => $open,
                'high'         => $high,
                'low'          => $low,
                'volume'       => $volume,
                'prevClose'    => $prevClose,
                'marketCap'    => $marketCap,
                'updatedAt'    => now()->toIso8601String(),
            ];
        } catch (RequestException $e) {
            Log::error("NaverFinance fetch error [{$code}]: " . $e->getMessage());
            throw new \RuntimeException("종목 정보를 가져올 수 없습니다: {$code}");
        }
    }

    private function fetchSearchResults(string $query): array
    {
        try {
            // 네이버 금융 자동완성 API
            $url  = 'https://ac.finance.naver.com/ac'
                . '?q=' . urlencode($query)
                . '&q_enc=UTF-8&t_koreng=1&st=111&r_lt=111&r_enc=UTF-8';
            $json = json_decode((string) $this->client->get($url)->getBody(), true);

            $results = [];
            foreach ($json['items'] ?? [] as $group) {
                foreach ($group as $item) {
                    if (!isset($item[0], $item[1])) continue;
                    $results[] = ['name' => $item[0], 'code' => $item[1]];
                }
            }

            $results = \array_slice($results, 0, 10);

            foreach ($results as &$stock) {
                try {
                    $info = $this->getStockInfo($stock['code']);
                    $stock['price']        = $info['price'];
                    $stock['change']       = $info['change'];
                    $stock['changeAmount'] = $info['changeAmount'];
                } catch (\Throwable) {
                    $stock['price']        = null;
                    $stock['change']       = null;
                    $stock['changeAmount'] = null;
                }
            }

            return $results;
        } catch (RequestException $e) {
            Log::error("NaverFinance search error [{$query}]: " . $e->getMessage());
            throw new \RuntimeException("검색에 실패했습니다: {$query}");
        }
    }

    private function fetchChartData(string $code, string $timeframe): array
    {
        try {
            $count = match ($timeframe) {
                'week'  => 50,
                'month' => 20,
                default => 30,
            };

            $url = "https://fchart.stock.naver.com/sise.nhn"
                . "?symbol={$code}&timeframe={$timeframe}&count={$count}&requestType=0";

            $xml = simplexml_load_string((string) $this->client->get($url)->getBody());

            $data = [];
            if ($xml && isset($xml->chartdata->item)) {
                foreach ($xml->chartdata->item as $item) {
                    $parts = explode('|', (string) $item->attributes()['data']);
                    if (\count($parts) < 5) continue;
                    $data[] = [
                        'date'   => substr($parts[0], 0, 4) . '-' . substr($parts[0], 4, 2) . '-' . substr($parts[0], 6, 2),
                        'open'   => (int) $parts[1],
                        'high'   => (int) $parts[2],
                        'low'    => (int) $parts[3],
                        'close'  => (int) $parts[4],
                        'volume' => (int) ($parts[5] ?? 0),
                    ];
                }
            }

            return $data;
        } catch (RequestException $e) {
            Log::error("NaverFinance chart error [{$code}]: " . $e->getMessage());
            throw new \RuntimeException("차트 데이터를 가져올 수 없습니다: {$code}");
        }
    }

    private function parseNumber(string $text): int
    {
        // "307,000 전일대비 ..." 같은 경우 첫 숫자 토큰만 추출
        if (preg_match('/^[\d,]+/', trim($text), $m)) {
            return (int) str_replace(',', '', $m[0]);
        }
        return 0;
    }
}
