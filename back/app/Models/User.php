<?php

namespace App\Models;

use App\Notifications\EmailVerification;
use App\Notifications\MyResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password', 'rol_id', 'avatar', 'insert_user_id', 'edit_user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::updating(function ($model) {
            if (Auth::guard()->user()) {
                $model->edit_user_id = Auth::guard()->user()->id;
                $model->edit_user_id->save();
            }
        });
    }

    public function rol()
    {
        return $this->belongsTo(Rol::class);
    }

    public function setEmailAttribute($value)
    {
        if ($this->id && $this->attributes['email'] != $value) {
            $this->attributes['email'] = $value;
            $this->attributes['email_verified_at'] = null;
            $this->sendEmailVerificationNotification();
        } else {
            $this->attributes['email'] = $value;
        }
    }

    public function setPasswordAttribute($value)
    {
        if ($value) {
            $this->attributes['password'] = bcrypt($value);
        }
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MyResetPassword($token));
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new EmailVerification());
    }
}
