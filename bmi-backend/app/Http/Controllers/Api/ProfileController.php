<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Mengambil data profil user yang sedang login
     */
    public function show(Request $request)
    {
        $profile = $request->user()->load('profile', 'educationHistories', 'workExperiences');
        
        return response()->json([
            'success' => true,
            'data' => $profile
        ]);
    }

    /**
     * Mengecek status kelengkapan profil pelamar
     */
    public function status(Request $request)
    {
        $profile = $request->user()->profile;
        
        $isComplete = false;
        if ($profile && $profile->ktp_number && $profile->phone) {
            $isComplete = true;
        }

        return response()->json([
            'success' => true,
            'is_complete' => $isComplete
        ]);
    }

    /**
     * Menyimpan atau memperbarui data profil (BCA Style Form)
     */
    public function storeOrUpdate(Request $request)
    {
        $user = $request->user();

        // Validasi
        $validator = Validator::make($request->all(), [
            'full_name'      => 'required|string|max:255',
            'phone'          => 'required|string|max:15',
            'alt_phone'      => 'nullable|string|max:15',
            'birth_place'    => 'required|string',
            'birth_date'     => 'required|date',
            'gender'         => 'required|in:LAKI-LAKI,PEREMPUAN',
            'religion'       => 'required|string',
            'marital_status' => 'required|string',
            'ktp_number'     => 'required|string|size:16',
            'last_education' => 'required|string',
            'address_ktp'    => 'required|string',
            'province'       => 'required|string',
            'city'           => 'required|string',
            'district'       => 'required|string',
            'sub_district'   => 'required|string',
            'rt_rw'          => 'nullable|string',
            'postal_code'    => 'required|string',
            'photo'          => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'about_me'       => 'nullable|string',
            'skills'         => 'nullable|string',
            'linkedin'       => 'nullable|string',
            'instagram'      => 'nullable|string',
            'facebook'       => 'nullable|string',
            'x_twitter'      => 'nullable|string',
            'education'      => 'required|json',
            'work'           => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        $data = $request->except(['photo', 'education', 'work']);

        // Handle Photo Upload
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('profiles', 'public');
            $data['photo'] = $path;
        }

        // Simpan Profil
        $profile = Profile::updateOrCreate(
            ['user_id' => $user->id],
            $data
        );

        // Handle Education Histories
        if ($request->has('education')) {
            $user->educationHistories()->delete();
            $educations = json_decode($request->education, true) ?? [];
            foreach ($educations as $edu) {
                $user->educationHistories()->create($edu);
            }
        }

        // Handle Work Experiences
        if ($request->has('work')) {
            $user->workExperiences()->delete();
            $works = json_decode($request->work, true) ?? [];
            foreach ($works as $work) {
                $user->workExperiences()->create($work);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil disimpan!',
            'data'    => $profile
        ], 200);
    }
}