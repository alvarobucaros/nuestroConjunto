<?php

namespace App\Http\Controllers;

use App\Models\Conjunto;
use App\Models\Comunicado;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ComunicadosController extends Controller
{
    /** 
     * Display a  listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $conjunto = Conjunto::first(); 

        $comunicados = Comunicado::where('com_titulo', 'like',  "%{$search}%")
                    ->orWhere('com_detalle', 'like',  "%{$search}%")
                    ->orderBy('com_tipo')
                    ->orderBy('com_fechaPublicacion')
                    ->paginate(10)
                    ->withQueryString();
//dd($comunicados);
        return Inertia::render('Comunicados/Index', ['conjunto' => $conjunto, 
        'comunicados'=>$comunicados, 'filters' => [
            'search' => $search,
        ], ]);
    }

    /** 
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // 
    }

    public function store(Request $request)
    {
        $anexoname = null;
        $filename = null;

        if ($request->hasFile('com_grafica')) {
            // Obtén el archivo
            $file = $request->file('com_grafica');

            // Genera un nombre único (puedes usar el original si prefieres)
            $filename = time() . '_' . $file->getClientOriginalName();

            // Mueve el archivo a public/logo
            $file->move(public_path('images'), $filename);
        }

        if ($request->hasFile('com_anexo')) {
            // Obtén el archivo
            $file = $request->file('com_anexo');

            // Genera un nombre único (puedes usar el original si prefieres)
            $anexoname = time() . '_' . $file->getClientOriginalName();

            // Mueve el archivo a public/logo
            $file->move(public_path('anexos'), $anexoname);
        }        
//dd($request->id);
        if($request->id == '0'){
 //           dd('crea');
            Comunicado::create([
                'com_tipo' => $request->com_tipo,          
                'com_titulo' => $request->com_titulo,
                'com_detalle' => $request->com_detalle,
                'com_grafica' => $filename,
                'com_anexo' => $anexoname,
                'com_fechaPublicacion' => date('Y-m-d'),
                'com_estado' => 'I',
            ]);
        }
        else{
   
            $comunicado = Comunicado::find($request->id);
            $comunicado->com_tipo = $request->com_tipo;            
            $comunicado->com_titulo = $request->com_titulo;
            $comunicado->com_detalle = $request->com_detalle;
            $comunicado->com_grafica = $filename;
            $comunicado->com_anexo = $anexoname;
            $comunicado->com_fechaPublicacion = $request->com_fechaPublicacion;
            $comunicado->com_estado = $request->com_estado;
            $comunicado->save();
        }

    }   


    /**
     * Display the specified resource.
     */
    public function show($op)
    {
        dd($op);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comunicados $comunicados)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comunicados $comunicados)
    {
       dd('actualiza');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comunicados $comunicados)
    {
        //
    }
}
