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
        Schema::create('tramites', function (Blueprint $table) {
            $table->id();
            $table->string('tra_nombre',100);
            $table->string('tra_apellido',100);
            $table->string('tra_direccion',100);
            $table->string('tra_ciudad',100);
            $table->string('tra_tipodoc',1);
            $table->string('tra_nrodoc',50);
            $table->string('tra_telefono',50);
            $table->string('tra_email',100);
            $table->string('tra_texto')->nullable(); 
            $table->string('tra_radicado')->nullable(); 
            $table->date('tra_fechaevento')->nullable(); 
            $table->date('tra_fechasolicitud')->nullable(); 
            $table->string('tra_horadesde',6)->nullable(); 
            $table->string('tra_horahasta',6)->nullable(); 
            $table->string('tra_observaciones')->nullable(); 
            $table->string('tra_estado')->nullable(); 
            $table->date('tra_fecharespuesta')->nullable(); 
            $table->string('tra_opcion',1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tramites');
    }
};
