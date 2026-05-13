<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    /**
     * DASHBOARD HRD: Mengambil semua pelamar yang masuk
     * URL: GET /api/hrd/applicants
     */
    public function allApplicants()
    {
        try {
            // Mengambil data lamaran beserta data User, Profil, dan Lowongannya
            $applications = Application::with(['user.profile', 'job'])
                ->latest()
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data pelamar berhasil diambil',
                'data'    => $applications
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * UPDATE STATUS: HRD mengubah status pelamar (Accepted/Rejected/Interview)
     * URL: PUT /api/applications/{id}/status
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,interview,accepted,rejected'
        ]);

        $application = Application::findOrFail($id);
        $application->update([
            'status' => $request->status
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status pelamar berhasil diperbarui',
            'data'    => $application
        ]);
    }

    /**
     * PROSES MELAMAR: Fungsi untuk pelamar mengirim lamaran
     * URL: POST /api/jobs/{jobId}/apply
     */
    public function apply(Request $request, $jobId)
    {
        $user = Auth::user();

        // Cek apakah sudah pernah melamar di posisi yang sama
        $exists = Application::where('user_id', $user->id)
            ->where('job_id', $jobId)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Anda sudah melamar di posisi ini.'
            ], 400);
        }

        $application = Application::create([
            'user_id' => $user->id,
            'job_id'  => $jobId,
            'status'  => 'pending',
            'applied_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Lamaran berhasil dikirim!',
            'data'    => $application
        ], 201);
    }

    /**
     * PELAMAR: Mengambil riwayat lamaran saya
     * URL: GET /api/my-applications
     */
    public function myApplications()
    {
        $user = Auth::user();
        $applications = Application::with('job')->where('user_id', $user->id)->latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $applications
        ]);
    }
}