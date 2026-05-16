<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'user_id', 
        'job_id', 
        'status', 
        'hrd_notes',
        'interview_date',
        'interview_time',
        'interview_type',
        'interview_location',
        'interview_notes'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function job() {
        return $this->belongsTo(Job::class);
    }
}