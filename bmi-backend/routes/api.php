<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ApplicationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- 1. RUTE PUBLIK (Bisa diakses siapa saja / Tanpa Token) ---

// Auth Pelamar & HRD
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Lowongan Kerja (Untuk Landing Page & Detail)
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);


// --- 2. RUTE TERPROTEKSI (Wajib membawa Token Sanctum) ---

Route::middleware('auth:sanctum')->group(function () {

    // Auth & User Session
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user()->load('profile'); // Mengambil data user beserta profilnya
    });
    Route::put('/user/password', [AuthController::class, 'updatePassword']);

    // Profil Pelamar (Data Lengkap ala BCA)
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/profile/status', [ProfileController::class, 'status']);
    Route::post('/profile', [ProfileController::class, 'storeOrUpdate']);

    // Proses Melamar (Sisi Pelamar)
    Route::post('/jobs/{jobId}/apply', [ApplicationController::class, 'apply']);
    Route::get('/my-applications', [ApplicationController::class, 'myApplications']);

    // --- FITUR KHUSUS HRD/ADMIN ---
    
    // Kelola Pelamar (Dashboard HRD)
    Route::get('/hrd/applicants', [ApplicationController::class, 'allApplicants']);
    Route::put('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);

    // Kelola Lowongan (CRUD Lowongan oleh HRD)
    Route::post('/jobs', [JobController::class, 'store']);
    Route::put('/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);

});

// --- 3. RUTE FALLBACK / SHADOW LOGIN ---
// Trik ini digunakan agar jika Laravel mencoba melakukan redirect ke 'login', 
// dia tidak crash merah, melainkan memberikan respon JSON 401 yang rapi.
Route::get('/login', function () {
    return response()->json([
        'success' => false,
        'message' => 'Unauthenticated. Silakan kirim Token yang valid.'
    ], 401);
})->name('login');