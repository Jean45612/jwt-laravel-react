<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = "roles";

    protected $fillable = [
        'nombre', 'estado', 'insert_user_id', 'edit_user_id'
    ];

    public function insertuser()
    {
        return $this->belongsTo(User::class, 'insert_user_id');
    }

    public function edit()
    {
        return $this->belongsTo(User::class, 'edit_user_id');
    }
}
