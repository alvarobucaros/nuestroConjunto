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
        Schema::create('avisos', function (Blueprint $table) {
            $table->id();
            $table->string('avi_titulo');
            $table->string('avi_subtitulo')->nullable(); 
            $table->string('avi_detalle');
            $table->string('avi_grafica')->nullable(); 
            $table->date('avi_fchpublica');
            $table->string('avi_estado',1);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avisos');
    }
};
