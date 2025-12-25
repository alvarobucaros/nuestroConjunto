<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comunicado extends Model
{
    use HasFactory;
    
    protected $table = 'comunicados';
    
    protected $fillable = [
        'com_tipo',
        'com_grafica',
        'com_titulo',
        'com_detalle',
        'com_anexo',
        'com_fechaPublicacion',
        'com_estado'
    ];
    
        public $timestamps = false;
    
        public function conjunto()
        {
            return $this->belongsTo(conjuntos::class, 'com_conjuntos_id');
        }
    
    }