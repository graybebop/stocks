<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_users'   => User::count(),
            'active_users'  => User::where('created_at', '>=', now()->subDays(30))->count(),
            'today_signups' => User::whereDate('created_at', today())->count(),
        ]);
    }
}
