<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->uuid('id')->primary(); // ID Utama menggunakan UUID
            
            // Informasi Pekerjaan
            $table->string('title'); // Contoh: Quality Assurance Manager
            $table->string('department'); // Contoh: Produksi, IT, atau QC
            $table->string('location')->default('Lampung'); // Default Lampung sesuai permintaanmu
            
            // Detail Tambahan (Biar tampilannya kaya BCA/BMI)
            $table->string('type')->default('Full-time'); // Full-time, Contract, Intern
            $table->string('salary_range')->nullable(); // Contoh: 8 - 12 Juta
            $table->text('description'); // Deskripsi pekerjaan (HTML/Text)
            $table->text('qualifications'); // Persyaratan pekerjaan (HTML/Text)
            
            // Status & Flag
            $table->boolean('is_featured')->default(false); // TRUE jika ingin tampil di "Lowongan Unggulan"
            $table->enum('status', ['Publish', 'Draft'])->default('Publish'); // Status lowongan
            
            $table->timestamps(); // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};