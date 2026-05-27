<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NaverFinanceCrawler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    public function __construct(private NaverFinanceCrawler $crawler) {}

    // GET /api/stock/search?q={query}
    public function search(Request $request): JsonResponse
    {
        $query = trim($request->query('q', ''));

        if (\strlen($query) < 1) {
            return response()->json(['message' => '검색어를 입력해주세요.'], 422);
        }

        // 로컬 DB에서 종목명/코드 검색
        $stocks = DB::table('stocks')
            ->where('name', 'like', "%{$query}%")
            ->orWhere('code', 'like', "%{$query}%")
            ->orderByRaw("CASE WHEN name = ? THEN 0 WHEN name LIKE ? THEN 1 ELSE 2 END", [$query, "{$query}%"])
            ->limit(10)
            ->get(['code', 'name', 'market'])
            ->toArray();

        if (empty($stocks)) {
            return response()->json([]);
        }

        // 각 종목 시세 병렬 조회 (캐시 우선)
        $results = [];
        foreach ($stocks as $stock) {
            try {
                $info = $this->crawler->getStockInfo($stock->code);
                $results[] = [
                    'code'         => $stock->code,
                    'name'         => $stock->name,
                    'market'       => $stock->market,
                    'price'        => $info['price'],
                    'change'       => $info['change'],
                    'changeAmount' => $info['changeAmount'],
                ];
            } catch (\Throwable) {
                $results[] = [
                    'code'         => $stock->code,
                    'name'         => $stock->name,
                    'market'       => $stock->market,
                    'price'        => null,
                    'change'       => null,
                    'changeAmount' => null,
                ];
            }
        }

        return response()->json($results);
    }

    // GET /api/stock/{code}
    public function show(string $code): JsonResponse
    {
        if (!preg_match('/^\d{6}$/', $code)) {
            return response()->json(['message' => '유효하지 않은 종목 코드입니다.'], 422);
        }

        try {
            $info = $this->crawler->getStockInfo($code);
            return response()->json($info);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 503);
        }
    }

    // GET /api/stock/ranking?type=volume|rise|fall|marcap
    public function ranking(Request $request): JsonResponse
    {
        $type = $request->query('type', 'volume');
        if (!\in_array($type, ['volume', 'rise', 'fall', 'marcap'])) {
            $type = 'volume';
        }

        $orderCol = match ($type) {
            'rise'   => ['change_rate',  'desc'],
            'fall'   => ['change_rate',  'asc'],
            'marcap' => ['market_cap',   'desc'],
            default  => ['volume',       'desc'],
        };

        $query = DB::table('stocks')
            ->whereNotNull($orderCol[0])
            ->whereNotNull('price');

        // 하락은 실제 하락 종목만
        if ($type === 'fall') {
            $query->where('change_rate', '<', 0);
        } else {
            $query->where($orderCol[0], '>', 0);
        }

        $rows = $query
            ->orderBy($orderCol[0], $orderCol[1])
            ->limit(20)
            ->get(['code', 'name', 'market', 'price', 'change_rate', 'change_amount', 'volume', 'market_cap', 'price_updated_at']);

        return response()->json($rows);
    }

    // GET /api/stock/{code}/chart?timeframe=day|week|month
    public function chart(Request $request, string $code): JsonResponse
    {
        if (!preg_match('/^\d{6}$/', $code)) {
            return response()->json(['message' => '유효하지 않은 종목 코드입니다.'], 422);
        }

        $timeframe = $request->query('timeframe', 'day');
        if (!\in_array($timeframe, ['day', 'week', 'month'])) {
            $timeframe = 'day';
        }

        try {
            $data = $this->crawler->getChartData($code, $timeframe);
            return response()->json($data);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 503);
        }
    }
}
