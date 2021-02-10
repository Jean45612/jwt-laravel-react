<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPassword;
use App\Http\Requests\ResetPassword;
use App\Models\User;
use Illuminate\Support\Facades\Password;

class ResetPasswordController extends Controller
{
    public function forgot(ForgotPassword $request)
    {
        if (User::where('email', $request->email)->first()) {
            Password::sendResetLink(
                $request->only('email')
            );

            return response()->json("El link para restablecer contraseña a sido enviado a su email.");
        }

        return response()->json('El usuario no existe.', 422);
    }

    public function reset(ResetPassword $request)
    {
        $status = Password::reset(
            $request->validated(),
            function ($user, $password) {
                $user->password = $password;
                $user->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json("Se cambió la contraseña exitosamente.");
        }

        return response()->json('El link para restablecer contraseña ha expirado, solicite uno nuevo.', 422);
    }
}
