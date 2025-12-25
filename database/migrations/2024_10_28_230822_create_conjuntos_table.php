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
        Schema::create('conjuntos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('con_nombre', 100);
            $table->string('con_direccion', 100)->nullable(); 
            $table->string('con_ciudad', 100);
            $table->string('con_tipodoc', 1);
            $table->string('con_nrodoc', 20);
            $table->string('con_telefono', 20);
            $table->string('con_email', 100);
            $table->string('con_logo', 100)->nullable();
            $table->string('con_comentarios')->nullable(); 
            $table->string('con_horario',240)->nullable();  
            $table->string('con_radicadoconsec', 6);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conjuntos');
    }
};
