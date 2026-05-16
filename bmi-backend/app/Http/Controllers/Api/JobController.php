<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::orderBy('created_at', 'desc')->get();
        return response()->json(['success' => true, 'data' => $jobs]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'           => 'required|string|max:255',
            'department'      => 'required|string',
            'type'            => 'required|string',
            'location'        => 'required|string',
            'work_system'     => 'required|string',
            'description'     => 'required|string',
            'qualifications'  => 'required|string',
            'benefits'        => 'nullable|string',
            'min_education'   => 'required|string',
            'major'           => 'nullable|string',
            'deadline'        => 'required|date',
            'headcount'       => 'nullable|integer',
            'status'          => 'required|string|in:Publish,Draft,Ditutup',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Simpan data
        $job = Job::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Lowongan berhasil diterbitkan!',
            'data'    => $job
        ], 201);
    }

    public function show($id)
    {
        $job = Job::find($id);
        
        if (!$job) {
            return response()->json([
                'success' => false,
                'message' => 'Lowongan tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $job
        ]);
    }

    public function update(Request $request, $id)
    {
        $job = Job::find($id);
        
        if (!$job) {
            return response()->json([
                'success' => false,
                'message' => 'Lowongan tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title'           => 'required|string|max:255',
            'department'      => 'required|string',
            'type'            => 'required|string',
            'location'        => 'required|string',
            'work_system'     => 'required|string',
            'description'     => 'required|string',
            'qualifications'  => 'required|string',
            'benefits'        => 'nullable|string',
            'min_education'   => 'required|string',
            'major'           => 'nullable|string',
            'deadline'        => 'required|date',
            'headcount'       => 'nullable|integer',
            'status'          => 'required|string|in:Publish,Draft,Ditutup',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $job->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Lowongan berhasil diperbarui!',
            'data'    => $job
        ]);
    }

    public function destroy($id)
    {
        $job = Job::find($id);
        if (!$job) return response()->json(['message' => 'Lowongan tidak ditemukan'], 404);
        $job->delete();
        return response()->json(['success' => true, 'message' => 'Lowongan dihapus!']);
    }
}