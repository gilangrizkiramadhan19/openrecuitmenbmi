<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke tabel users (Sesuaikan jika kamu pakai ID biasa atau UUID)
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            
            // Informasi Profil & Kontak
            $table->string('full_name');
            $table->string('phone')->nullable();
            $table->string('alt_phone')->nullable();
            
            // Informasi Personal
            $table->string('birth_place')->nullable(); // Tempat Lahir
            $table->date('birth_date')->nullable();   // Tanggal Lahir
            $table->enum('gender', ['LAKI-LAKI', 'PEREMPUAN'])->nullable();
            $table->string('religion')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('ktp_number', 16)->unique()->nullable();
            $table->string('last_education')->nullable(); // Pendidikan Terakhir
            
            // Foto Profil
            $table->string('photo')->nullable();
            
            // Alamat Lengkap (sesuai KTP)
            $table->text('address_ktp')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('district')->nullable();    // Kecamatan
            $table->string('sub_district')->nullable(); // Kelurahan
            $table->string('rt_rw')->nullable();
            $table->string('postal_code')->nullable();

            // Tambahan: Keahlian & Sosmed
            $table->text('skills')->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('x_twitter')->nullable();
            $table->string('linkedin')->nullable();
            $table->text('about_me')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};