<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conjunto extends Model
{
    use HasFactory;

    protected $table = 'conjuntos';

    protected $fillable = [
        'con_nombre',
        'con_direccion',
        'con_ciudad',
        'con_tipodoc',
        'con_nrodoc',
        'con_telefono',
        'con_email',
        'con_logo',
        'con_comentarios', 
        'con_horario',
        'con_radicadoconsec',
    ];

    public $timestamps = false;
}