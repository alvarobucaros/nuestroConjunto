<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clasificados', function (Blueprint $table) {
            $table->id();
            $table->string('cla_grafica',150)->nullable(); // ruta imagen PNG/GIF
            $table->string('cla_titulo',100);
            $table->text('cla_detalle');
            $table->string('cla_nombre',100);
            $table->string('cla_apellido',100);
            $table->string('cla_telefonos',50)->nullable();
            $table->string('cla_email',100)->nullable();
            $table->date('cla_fchPublicacion');
            $table->integer('cla_fchHasta');
            $table->char('cla_estado', 1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clasificados');
    }
};
