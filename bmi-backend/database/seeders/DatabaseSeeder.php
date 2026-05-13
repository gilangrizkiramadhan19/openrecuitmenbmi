<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat User HRD
        User::create([
            'name' => 'HRD Admin',
            'email' => 'hrd@bmi.com',
            'password' => Hash::make('password'),
            'role' => 'hrd'
        ]);
    }
}
