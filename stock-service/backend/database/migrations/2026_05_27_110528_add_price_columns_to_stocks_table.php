<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('stocks', function (Blueprint $table) {
            $table->bigInteger('price')->nullable()->after('market');
            $table->float('change_rate', 6, 2)->nullable()->after('price');
            $table->bigInteger('change_amount')->nullable()->after('change_rate');
            $table->bigInteger('volume')->nullable()->after('change_amount');
            $table->bigInteger('market_cap')->nullable()->after('volume');
            $table->timestamp('price_updated_at')->nullable()->after('market_cap');

            $table->index('volume');
            $table->index('change_rate');
            $table->index('market_cap');
        });
    }

    public function down(): void
    {
        Schema::table('stocks', function (Blueprint $table) {
            $table->dropIndex(['volume']);
            $table->dropIndex(['change_rate']);
            $table->dropIndex(['market_cap']);
            $table->dropColumn(['price', 'change_rate', 'change_amount', 'volume', 'market_cap', 'price_updated_at']);
        });
    }
};
