<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPassword extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'min:8|max:25|required|confirmed',
            'token' => 'required|string'
        ];
    }

    public function messages()
    {
        return [
            'email.email' => 'El usuario debe ser un email.',
            'email.required' => 'El usuario es requerido.',
            'password.required' => 'La contraseña es requerida.',
            'password.min' => 'La contraseña debe tener como mínimo 8 caracteres',
            'password.max' => 'La contraseña debe tener como máximo 25 caracteres',
            'password.confirmed' => 'El campo de confirmación de contraseña no coincide.',
            'token.required' => 'El token no ha sido enviado.',
        ];
    }
}
