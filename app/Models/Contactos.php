<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Contactos extends Model
{
    
    protected $table = 'contactos';
    
    protected $fillable = [
        'con_nombres',
        'con_apellidos',  
        'con_tipopqr', 
        'con_email',
        'con_telefono',
        'con_mensaje',
        'con_soportepdf',
        'con_secuencia',
        'con_fechaRecibo',   
        'con_estado',
        'con_respuesta',
        'con_fechaRespuesta',
        'con_radicado',
        'con_enviar',
    ];
    
        public $timestamps = false;
}
