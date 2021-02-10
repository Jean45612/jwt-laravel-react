<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Permiso;
use App\Models\Rol;
use App\Models\User;
use Illuminate\Database\Seeder;

class CatalogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['nombre' => 'Administrador'],
            ['nombre' => 'Usuario'],
        ];

        Rol::insert($roles);

        $user = User::create(['email' => 'jluiscoba1989@gmail.com', 'password' => 'admin', 'rol_id' => 1]);

        $user->markEmailAsVerified();

        $menu = [
            ['titulo' => 'Usuarios', 'route' => '/usuarios', 'icono' => 'account_circle', 'parent_id' => null],
        ];

        Menu::insert($menu);

        $permisos = [
            ['menu_id' => 1, 'rol_id' => 1],
        ];

        Permiso::insert($permisos);
    }
}
