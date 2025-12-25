<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    use HasFactory;

    protected $table = 'publicaciones';
    
    protected $fillable = [
            'pub_grafica',
            'pub_titulo',
            'pub_detalle',
            'pub_anexo',
            'pub_estado', 
    ];
    
        public $timestamps = false;
    
        public function conjunto()
        {
            return $this->belongsTo(conjuntos::class, 'cla_conjunto_id');
        }
    
    }