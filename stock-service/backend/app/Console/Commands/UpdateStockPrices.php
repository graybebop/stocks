<?php

namespace App\Console\Commands;

use App\Services\NaverFinanceCrawler;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateStockPrices extends Command
{
    protected $signature   = 'stocks:update-prices';
    protected $description = '인기 종목 100개 시세를 네이버 금융에서 크롤링해서 DB 업데이트';

    // 시가총액 상위 KOSPI + KOSDAQ 대표 종목 100개
    private const array CODES = [
        // KOSPI 대형주
        '005930', '000660', '005380', '207940', '005490',
        '035420', '000270', '068270', '105560', '055550',
        '028260', '012330', '066570', '035720', '003550',
        '032830', '096770', '017670', '086790', '003490',
        '009150', '051910', '006400', '011170', '034730',
        '018260', '010950', '030200', '015760', '033780',
        '034020', '047050', '010130', '011790', '008770',
        '009830', '042660', '000100', '024110', '139480',
        '271560', '097950', '000810', '032640', '011200',
        '090430', '316140', '161390', '064350', '006800',
        // KOSPI 중형주
        '010060', '241560', '282330', '006360', '007070',
        '018880', '029780', '001040', '004020', '000720',
        '011780', '009240', '002380', '021240', '008560',
        '016360', '004170', '010140', '001300', '006280',
        // KOSDAQ 대형주
        '247540', '086520', '196170', '091990', '141080',
        '263750', '112040', '145020', '058470', '166090',
        '041510', '035900', '122870', '253450', '357780',
        '095340', '066970', '214150', '042700', '039030',
        '054040', '041830', '048260', '950130', '205470',
        // KOSDAQ 중형주
        '036810', '078600', '095760', '078130', '108670',
        '183300', '032500', '084370', '065510', '236340',
        '228800', '038540', '131970', '089470', '060310',
        '091580', '094970', '036490', '065680', '119830',
    ];

    public function handle(NaverFinanceCrawler $crawler): int
    {
        $codes   = self::CODES;
        $total   = \count($codes);
        $success = 0;
        $failed  = 0;

        $this->info("총 {$total}개 종목 시세 업데이트 시작...");
        $bar = $this->output->createProgressBar($total);
        $bar->start();

        foreach ($codes as $code) {
            try {
                $info = $crawler->getStockInfo($code);

                DB::table('stocks')->updateOrInsert(
                    ['code' => $code],
                    [
                        'name'             => $info['name'],
                        'price'            => $info['price'],
                        'change_rate'      => $info['change'],
                        'change_amount'    => $info['changeAmount'],
                        'volume'           => $info['volume'],
                        'market_cap'       => $info['marketCap'] ?? null,
                        'price_updated_at' => now(),
                        'updated_at'       => now(),
                    ]
                );

                $success++;
            } catch (\Throwable $e) {
                $failed++;
                Log::warning("stocks:update-prices 실패 [{$code}]: " . $e->getMessage());
            }

            $bar->advance();
            usleep(300_000); // 0.3초 간격 (네이버 차단 방지)
        }

        $bar->finish();
        $this->newLine();
        $this->info("완료 — 성공: {$success}개, 실패: {$failed}개");

        return self::SUCCESS;
    }
}
