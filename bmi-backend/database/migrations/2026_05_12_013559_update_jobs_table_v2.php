<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void {
    Schema::table('jobs', function (Blueprint $table) {
        $table->enum('work_system', ['WFO', 'Hybrid', 'Remote'])->default('WFO');
        $table->text('benefits')->nullable();
        $table->string('min_education')->nullable();
        $table->integer('min_age')->nullable();
        $table->string('major')->nullable();
        $table->boolean('cv_required')->default(true);
        $table->boolean('portfolio_required')->default(false);
        $table->date('deadline')->nullable();
        $table->integer('headcount')->default(1);
        $table->text('selection_stages')->nullable(); // Simpan dalam string/json
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            //
        });
    }
};
