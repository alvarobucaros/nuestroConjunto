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
        Schema::create('publicaciones', function (Blueprint $table) {
            $table->id();
            $table->string('pub_grafica',150)->nullable(); // ruta imagen PNG/GIF
            $table->string('pub_titulo',100);
            $table->text('pub_detalle');
            $table->string('pub_anexo',150)->nullable(); // ruta PDF
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publicaciones');
    }
};
