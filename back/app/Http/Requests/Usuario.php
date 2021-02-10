<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Usuario extends FormRequest
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
            'email' => 'required|email|unique:users,email,' . $this->id . ',id', //CON ESTO IGNORO AL REGISTRO
            'password' => 'required_without:id| confirmed', //REQUIRED WITHOUT ES PARA PONER LA CONTRASEÑA REQUERIDA CUANDO NO ESTA EDITANDO
            'rol_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'El usuario ya ha sido tomado.',
            'email.email' => 'El usuario debe ser un email.',
            'email.required' => 'El usuario es requerido.',
            'password.required_without' => 'La contraseña es requerida.',
            'password.confirmed' => 'El campo de confirmación de contraseña no coincide.',
            'rol_id.required' => 'El rol es requerido.',
        ];
    }
}
