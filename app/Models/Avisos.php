<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Avisos extends Model
{
      protected $table = 'avisos';

        protected $fillable = [
            'avi_titulo',
            'avi_subtitulo',
            'avi_detalle',
            'avi_grafica',            
            'avi_fchpublica',
            'avi_estado',
    ];
    
        public $timestamps = false;
}
