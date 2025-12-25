<?php

namespace App\Http\Controllers;

use App\Models\Tramite;
use App\Models\Conjunto;
use App\Services\MailService;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Response; // Para respuestas HTTP

use Illuminate\Http\Request;
use Inertia\Inertia;

class TramiteController extends Controller
{
    protected $mailService;
  

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }
    /**
     * Display a listing of the resource. 
     */

    public function indexVer(Request $request)
    {
        $search = $request->input('search');

        $conjunto = Conjunto::first();

        $tramites = Tramite::where('tra_nombre', 'like',  "%{$search}%")
            ->orderBy('tra_opcion')
            ->orderBy('tra_fechasolicitud', 'DESC')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Aplicacion/TramitesVer', ['conjunto' => $conjunto, 
            'tramites'=> $tramites, 'filters' => [
            'search' => $search,
        ], ]);

    }
  

    public function index($op)
    {
        $conjunto = Conjunto::first();

        return Inertia::render('Aplicacion/Tramites', ['conjunto' => $conjunto, 'op'=>$op]); 
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
        $textoCorreo = "Nombre: ".$request->tra_nombre." ".$request->tra_apellido."<br>". 
        ", Su Trámite con radicado ".$request->tra_radicado." Se ha presentado correctamente hoy ". $hoy ."<br>";
      
        $respuesta = $this->mailService->enviarCorreo($request->tra_email, "Radicado ".$request->tra_radicado, $textoCorreo);

            Tramite::create([
            'tra_nombre' => $request->tra_nombre,
            'tra_apellido' => $request->tra_apellido,
            'tra_direccion'=> $request->tra_direccion,
            'tra_ciudad'=> $request->tra_ciudad,
            'tra_tipodoc'=> $request->tra_tipodoc,
            'tra_nrodoc'=> $request->tra_nrodoc,
            'tra_telefono'=> $request->tra_telefono,
            'tra_email'=> $request->tra_email,
            'tra_texto'=> $request->tra_texto,
            'tra_radicado'=> $request->tra_radicado,
            'tra_fechaevento'=> $request->tra_fechaevento,
            'tra_fechasolicitud'=>  date('Y-m-d'),
            'tra_horadesde'=> $request->tra_horadesde,
            'tra_horahasta'=> $request->tra_horahasta,
            'tra_observaciones'=> $request->tra_observaciones,
            'tra_estado'=> $request->tra_estado,
            'tra_fecharespuesta'=> $request->tra_fecharespuesta,
            'tra_opcion'=> $request->tra_opcion,
            ]);

             $this->updateRadicado();
             return redirect()->back()->with('success', 'trámite creado exitosamente.');
        
    }

    private function updateRadicado()
    {
        $conjunto = Conjunto::first();
        $radicado = $conjunto->con_radicadoconsec;
        $entero = (int) $radicado + 1;
        $r = strval($entero);
        $r = substr('00000',0,5 - strlen($r)).$r;

        $conjunto->update(['con_radicadoconsec' => $r]);
   
    }
    /**
     * Display the specified resource.
     */
    public function show(tramite $tramite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tramite $tramite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, tramite $tramite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tramite = Tramite::find($id);
        if (!$tramite) {
            return response()->json(['message' => 'tramite no encontrado'], Response::HTTP_NOT_FOUND);
        }
        $tramite->delete();

         return redirect()->back()->with('success','tramite eliminado correctamente');
        
    }

}
