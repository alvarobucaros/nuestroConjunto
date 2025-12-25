<?php

namespace App\Http\Controllers;

use App\Models\Conjunto;
use App\Models\Contactos;
use App\Services\MailService;

use Illuminate\Http\Response; // Para respuestas HTTP
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactosController extends Controller
{

    protected $mailService;
    protected $tipo = ['P' => 'Petición', 'Q' => 'Queja', 'R' => 'Reclamo', 'S' => 'Sugerencia', 'C' => 'Comentario'];

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }
    /**
     * Display a listing of the  resource.
     */
    public function index()
    {
        $conjunto = Conjunto::first(); 

        return Inertia::render('Contactos/Index', ['conjunto' => $conjunto]);
   
    }
        public function misIndex()
    {
        $conjunto = Conjunto::first(); 
        $contactos = Contactos::where('con_estado', '!=' ,'T')
        ->orderBy('con_tipopqr')
        ->orderBy('con_fechaRecibo')
        ->paginate(12);
        return Inertia::render('Contactos/MisIndex', ['conjunto' => $conjunto, 'contactos' => $contactos ]);
   
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        // 1. Enviar el correo
        $hoy=date('l, F j, Y');
        $textoCorreo = "Nombre: ".$request->con_nombres." ".$request->con_apellidos."<br>". 
        "Su " . $this->tipo[$request->con_tipopqr]. 
        " con radicado ".$request->con_radicado." Se ha presentado correctamente hoy ". $hoy ."<br>";
      
        $respuesta = $this->mailService->enviarCorreo($request->con_email, "Radicado ".$request->con_radicado, $textoCorreo);

        $nombreArchivoAnexo = null;

        $request->validate([
            'con_soportepdf' => 'nullable|file|mimes:pdf|max:2048', // 2MB máximo
        ]);


        if ($request->hasFile('con_soportepdf')) {
            $archivo = $request->file('con_soportepdf');

            $nombreArchivoAnexo = time().'_'.$archivo->getClientOriginalName();
            $archivo->move(public_path('anexos'), $nombreArchivoAnexo);
        }

    // 3. Crear el registro en la base de datos
        Contactos::create([
            'con_nombres' => $request->con_nombres,
            'con_apellidos' => $request->con_apellidos,
            'con_tipopqr' => $request->con_tipopqr,
            'con_email' => $request->con_email,
            'con_telefono' => $request->con_telefono,
            'con_mensaje' => $request->con_mensaje,
            'con_soportepdf' => $nombreArchivoAnexo,          
            'con_secuencia' =>  $request->con_secuencia,
            'con_fechaRecibo' => date('Y-m-d'),
            'con_estado' =>  $request->con_estado,
            'con_respuesta' =>  $request->con_respuesta,
            'con_fechaRespuesta' =>  $request->con_fechaRespuesta,
            'con_radicado' =>  $request->con_radicado,
        ]);

           // 4. Redireccionar 
           $this->updateRadicado();
           return redirect()->back()->with('success', 'contacto creado exitosamente.');
    }

    private function updateRadicado()
    {
        $conjunto = Conjunto::first();
        $radicado = $conjunto->con_radicadoconsec;
        $entero = (int) $radicado + 1;
        $r = strval($entero);
        $r = substr('00000',0,5 - strlen($r)).$r;

        $conjunto->update(['con_radicadoconsec' => $r]);
       // dd($r);
    }
    /**
     * Display the specified resource.
     */
    public function show(contactos $contactos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(contactos $contactos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $hoy=date('l, F j, Y');
        
        $textoCorreo = "Nombre: ".$request->con_nombres." ".$request->con_apellidos."<br>". 
        "Su " . $this->tipo[$request->con_tipopqr]. " con radicado ".$request->con_radicado;

        if($request->con_estado == 'P'){
            $textoCorreo .= " se encuentra pendiente de responder ";
        } else {
            $textoCorreo .= " ha sido respondida correctamente";
        }
        
        $textoCorreo .= " hoy "  . $hoy ."<br>" . $request->con_respuesta;
        

        $respuesta = $this->mailService->enviarCorreo($request->con_email, "Radicado ".$request->con_radicado, $textoCorreo);

        $contactos = Contactos::find($id);
        $contactos->con_estado = 'R';
        $contactos->con_respuesta = $request->con_respuesta;
        $contactos->con_fechaRespuesta = date('Y-m-d');
        $contactos->con_estado = $request->con_estado;
        $contactos->save();


        if( $request->con_envia == 'S'){
            echo 'Envia correo';
        }

           return redirect()->back()->with('success', 'contacto creado exitosamente.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(contactos $contactos)
    {
        //
    }
}
