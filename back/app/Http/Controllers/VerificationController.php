<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(Request $request)
    {
        if (!$request->hasValidSignature()) ///ESTE METODO TE PERMITE VERIFICAR SI LA URL QUE SE ESTA RECIBIENDO ES VALIDA Y SI NO HA SIDO MANIPULADA
        {
            return redirect(config('constants.front_end') . 'verify-email/' . $request->id);
        }

        $user = User::find($request->id);

        if (!$user->hasVerifiedEmail()) { //SI EL USUARIO NO HA VERIFICADO SU EMAIL
            $user->markEmailAsVerified();
        }

        return redirect(config('constants.front_end') . 'response-verify-email'); //LO MANDO AL SISTEMA
    }

    public function resend(Request $request)
    {
        if ($request->id) {
            $user = User::find($request->id);
        } else {
            $user = User::where('email', $request->email)->first();
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json('Usted ya ha verificado su correo', 422);
        }

        event(new Registered($user)); //CON ESTO MANDO EL CORREO

        return response()->json('El link de verificación ha sido enviado a su correo.');
    }
}
