<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, 
        HasFactory, 
        Notifiable, 
        HasUuids;     // ← Pastikan trait ini ada

    /**
     * UUID Configuration
     */
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Mass Assignment
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * Hidden attributes
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Attribute Casting
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relasi: User (Pelamar) memiliki satu Profil
     */
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    /**
     * Relasi: User memiliki banyak riwayat pendidikan (khusus pelamar)
     */
    public function educationHistories()
    {
        return $this->hasMany(EducationHistory::class);
    }

    /**
     * Relasi: User memiliki banyak riwayat pekerjaan (khusus pelamar)
     */
    public function workExperiences()
    {
        return $this->hasMany(WorkExperience::class);
    }
}