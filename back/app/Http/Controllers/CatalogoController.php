<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Permiso;
use Illuminate\Support\Facades\Auth;
use stdClass;

class CatalogoController extends Controller
{
    public function obtenerMenu()
    {
        $data = Menu::where('estado', '1');

        $permisos = Permiso::where('rol_id', Auth::user()->rol_id)->get();
        $pluck = [];
        foreach ($permisos as $value) {
            $parent = $this->permisos($value->menu_id);
            $pluck = array_merge($pluck, $parent);
        }
        $data = $data->whereIn('id', $pluck)->get();

        $response = $this->recursivity($data);

        return response()->json($response, 200);
    }

    public function permisos($permiso)
    {
        $response = [];

        $menu = Menu::where('id', $permiso)->first();
        if ($menu) {
            array_push($response, $menu->id);
            if ($menu->parent_id) {
                $parent = $this->permisos($menu->parent_id);
                if ($parent) {
                    foreach ($parent as $value) {
                        array_push($response, $value);
                    }
                }
            }
        }

        return $response;
    }

    public function recursivity($data, $parentId = null)
    {
        $response = [];

        foreach ($data as $value) {
            $object = new stdClass();
            $object->id = $value->id;
            $object->label = $value->titulo;
            $object->link = $value->route;
            $object->icon = $value->icono;
            $object->estado = $value->estado;

            if ($value->parent_id == $parentId) {
                $child = $this->recursivity($data, $value->id);
                if ($child) {
                    $object->items = $child;
                }
                array_push($response, $object);
            }
        }

        return $response;
    }
}
