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
        Schema::table('applications', function (Blueprint $table) {
            $table->date('interview_date')->nullable();
            $table->time('interview_time')->nullable();
            $table->enum('interview_type', ['Online', 'Offline'])->nullable();
            $table->string('interview_location')->nullable();
            $table->text('interview_notes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn([
                'interview_date',
                'interview_time',
                'interview_type',
                'interview_location',
                'interview_notes'
            ]);
        });
    }
};
