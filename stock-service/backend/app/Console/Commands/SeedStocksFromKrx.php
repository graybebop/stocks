<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SeedStocksFromKrx extends Command
{
    protected $signature   = 'stocks:seed';
    protected $description = 'KRX 상장법인 목록을 다운로드해서 stocks 테이블에 저장';

    private const KRX_URL = 'https://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13';

    public function handle(): int
    {
        $this->info('KRX 종목 목록 다운로드 중...');

        $client = new Client([
            'timeout' => 30,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer'    => 'https://kind.krx.co.kr/',
            ],
        ]);

        $html = (string) $client->get(self::KRX_URL)->getBody();
        // KRX 페이지는 EUC-KR
        $html = mb_convert_encoding($html, 'UTF-8', 'EUC-KR');

        preg_match_all('/<tr[^>]*>(.*?)<\/tr>/s', $html, $rows);

        $stocks   = [];
        $inserted = 0;
        $skipped  = 0;

        foreach ($rows[1] as $row) {
            preg_match_all('/<td[^>]*>\s*(.*?)\s*<\/td>/s', $row, $cells);
            $cols = array_map(fn ($c) => trim(strip_tags($c)), $cells[1]);

            if (count($cols) < 3) continue;

            $name   = $cols[0] ?? '';
            $market = trim($cols[1] ?? '');
            $code   = trim($cols[2] ?? '');

            // 6자리 숫자 코드만
            if (!preg_match('/^\d{6}$/', $code) || empty($name)) {
                $skipped++;
                continue;
            }

            $market = match (true) {
                str_contains($market, '코스피') => 'KOSPI',
                str_contains($market, '코스닥') => 'KOSDAQ',
                str_contains($market, 'KONEX') => 'KONEX',
                default                         => $market,
            };

            $stocks[] = [
                'code'       => $code,
                'name'       => $name,
                'market'     => $market,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $inserted++;
        }

        if (empty($stocks)) {
            $this->error('파싱된 종목이 없습니다. KRX 페이지 구조가 바뀌었을 수 있습니다.');
            return self::FAILURE;
        }

        DB::table('stocks')->truncate();

        // 500건씩 chunked insert
        foreach (array_chunk($stocks, 500) as $chunk) {
            DB::table('stocks')->insert($chunk);
        }

        $this->info("완료: {$inserted}개 종목 저장 (건너뜀: {$skipped}개)");
        return self::SUCCESS;
    }
}
