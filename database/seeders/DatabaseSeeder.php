<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Conjunto;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       
         Conjunto::factory()->create([
            'con_nombre' => 'CONJUNTO RESIDENCIAL LAS PRUEBAS',
            'con_direccion' => 'Avenida nacional # 55 - 22',
            'con_ciudad' => 'Santa Lucía',
            'con_tipodoc' => 'N',
            'con_nrodoc' => '9800545221',
            'con_telefono' => '601 357 22 22',
            'con_email' => 'laspruebas_ph@gmail.com',
            'con_logo' => null,          
            'con_web' => 'https://aortizc.com.co',
            'con_horario' => 'L-V 9:00 AM 1:00 PM Sábado 9:00 AM 2:00 PM ',
            'con_radicadoconsec' => '00001'
         ]);

        User::factory()->create([
            'name' => 'Administrador para pruebas',
            'email' => 'admin@com.co',
            'conjunto_id' => 1,
            'password' => 'Admin123',
            'role' => 'super'        
        ]);
    }
}
