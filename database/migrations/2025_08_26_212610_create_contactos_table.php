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
        Schema::create('contactos', function (Blueprint $table) {
            $table->id();
            $table->string('con_nombres',150); 
            $table->string('con_apellidos',150);   
            $table->string('con_tipopqr',1);  
            $table->string('con_email',150); 
            $table->string('con_telefono',50); 
            $table->string('con_mensaje'); 
            $table->string('con_soportepdf')->nullable(); 
            $table->char('con_secuencia',2); 
            $table->date('con_fechaRecibo');   
            $table->char('con_estado',1); 
            $table->string('con_respuesta')->nullable(); 
            $table->date('con_fechaRespuesta')->nullable(); 
            $table->string('con_radicado',15);            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contactos');
    }
};
