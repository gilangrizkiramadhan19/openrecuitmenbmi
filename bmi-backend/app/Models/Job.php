<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Job extends Model
{
    use HasFactory, HasUuids;

    /**
     * UUID Configuration
     */
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Mass Assignment
     */
    protected $fillable = [
        'title',
        'department',
        'type',
        'location',
        'work_system',
        'description',
        'qualifications',
        'benefits',
        'min_education',
        'min_age',
        'major',
        'deadline',
        'headcount',
        'status',
    ];

    // Jika nanti ingin menambahkan kolom yang boleh di-cast
    // protected function casts(): array
    // {
    //     return [
    //         'deadline' => 'date',
    //         'min_age'  => 'integer',
    //         'headcount'=> 'integer',
    //     ];
    // }
}