<?php

use App\Http\Controllers\Api\StockController;
use Illuminate\Support\Facades\Route;

Route::prefix('stock')->group(function () {
    Route::get('/search',  [StockController::class, 'search']);
    Route::get('/ranking', [StockController::class, 'ranking']);
    Route::get('/{code}',       [StockController::class, 'show'])->where('code', '\d{6}');
    Route::get('/{code}/chart', [StockController::class, 'chart'])->where('code', '\d{6}');
});
