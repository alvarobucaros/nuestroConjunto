<?php 

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clasificado extends Model
{
use HasFactory;

protected $table = 'clasificados';

protected $fillable = [
        'cla_grafica',     
        'cla_titulo',
        'cla_detalle',
        'cla_nombre',
        'cla_apellido',
        'cla_telefonos',
        'cla_email',
        'cla_fchPublicacion',
        'cla_fchHasta',
        'cla_estado'
];

    public $timestamps = false;

    public function conjunto()
    {
        return $this->belongsTo(conjuntos::class, 'cla_conjunto_id');
    }

}