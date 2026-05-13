<?php
use App\Models\User;

$user = User::where('email', 'hrd@bmi.com')->first();
if (!$user) {
    $user = User::create([
        'name' => 'HRD Admin',
        'email' => 'hrd@bmi.com',
        'password' => bcrypt('password'),
        'role' => 'hrd'
    ]);
    echo "HRD user created successfully.\n";
} else {
    echo "HRD user already exists.\n";
}
