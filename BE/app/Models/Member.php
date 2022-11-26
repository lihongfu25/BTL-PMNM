<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'address',
        'gender',
        'date_of_birth',
        'username',
        'avatar',
        'password',
        'role_id',
    ];
    protected $hidden = [
        'password'
    ];
    
    public $timestamps = false;

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }
}
