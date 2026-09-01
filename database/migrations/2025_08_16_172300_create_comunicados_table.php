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
        Schema::create('comunicados', function (Blueprint $table) {
            $table->id();
            $table->string('com_tipo',1);
            $table->string('com_grafica',150)->nullable();  // ruta imagen PNG/GIF
            $table->string('com_titulo',100);
            $table->text('com_detalle');
            $table->string('com_anexo',150)->nullable();  // ruta al PDF
            $table->date('com_fechaPublicacion');
            $table->char('com_estado',1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comunicados');
    }
};
