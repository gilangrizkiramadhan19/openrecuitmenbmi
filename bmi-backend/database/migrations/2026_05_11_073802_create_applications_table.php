<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke User (Pelamar) - Gunakan foreignUuid karena kamu pakai UUID
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            
            // Relasi ke Job (Lowongan)
            $table->foreignUuid('job_id')->constrained()->onDelete('cascade');
            
            // Status Alur Rekrutmen
            $table->enum('status', [
                'pending',    // Baru melamar
                'reviewed',   // Sedang dilihat HRD
                'interview',  // Dipanggil interview
                'rejected',   // Ditolak
                'accepted'    // Diterima
            ])->default('pending');

            // Catatan tambahan dari HRD (Misal: "Interview jam 10 ya")
            $table->text('hrd_notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};