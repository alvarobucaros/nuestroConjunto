<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tramite extends Model
{
    protected $table = 'tramites';

        protected $fillable = [
            'tra_nombre',
            'tra_apellido',
            'tra_direccion',
            'tra_ciudad',
            'tra_tipodoc',
            'tra_nrodoc',
            'tra_telefono',
            'tra_email',
            'tra_texto',
            'tra_radicado',
            'tra_fechaevento',
            'tra_fechasolicitud',
            'tra_horadesde',
            'tra_horahasta',
            'tra_observaciones',
            'tra_estado',
            'tra_fecharespuesta',
            'tra_opcion',
    ];
    
        public $timestamps = false;
}
