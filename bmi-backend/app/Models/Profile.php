<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    // Daftar kolom yang boleh diisi
    protected $fillable = [
        'user_id',
        'full_name',
        'phone',
        'alt_phone',
        'birth_place',
        'birth_date',
        'gender',
        'religion',
        'marital_status',
        'ktp_number',
        'last_education',
        'photo',
        'address_ktp',
        'province',
        'city',
        'district',
        'sub_district',
        'rt_rw',
        'postal_code',
        'skills',
        'instagram',
        'facebook',
        'x_twitter',
        'linkedin',
        'about_me',
    ];

    /**
     * Relasi: Profil ini milik seorang User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}