<?php

namespace App\Http\Controllers;

use App\Models\Conjunto;
use App\Models\Avisos;
use Illuminate\Http\Response; // Para respuestas HTTP
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AvisosController extends Controller
{
    /**
     * Display a listing of the  resource.
     */
     public function index(Request $request)
    {
        $search = $request->input('search');

        $conjunto = Conjunto::first(); 

        $avisos = Avisos::where('avi_titulo', 'like',  "%{$search}%")
        ->orderBy('avi_titulo')
        ->orderBy('avi_fchpublica', 'DESC')
        ->paginate(10)
        ->withQueryString();

        return Inertia::render('Avisos/Index', ['conjunto' => $conjunto, 
        'avisos'=>$avisos, 'filters' => [
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
     
        $request-> validate([
            'avi_titulo' => 'required|max:100',
            'avi_detalle' => 'required|max:100',
        ]);

        
        if ($request->hasFile('avi_grafica')) {
            // Obtén el archivo
            $file = $request->file('avi_grafica');

            // Genera un nombre único (puedes usar el original si prefieres)
            $filename = time() . '_' . $file->getClientOriginalName();

            // Mueve el archivo a public/logo
            $file->move(public_path('images'), $filename);

        }

        if($request->id === 0){
            
            Avisos::create([
                'avi_titulo' => $request->avi_titulo,
                'avi_subtitulo' => $request->avi_subtitulo,
                'avi_detalle' => $request->avi_detalle,
                'avi_grafica' =>  $filename,         
                'avi_fchpublica' => date('Y-m-d'),
                'avi_estado' => 'I'
            ]);
        }
        else{
            $avisos = Avisos::find($request->id);
            $avisos->avi_titulo = $request->avi_titulo;
            $avisos->avi_subtitulo = $request->avi_subtitulo;
            $avisos->avi_detalle = $request->avi_detalle;
            $avisos->avi_grafica = $filename; // corregido
            $avisos->save();
        }

        return redirect()->back()->with('success', 'conjunto creado exitosamente.');

    }

    /**
     * Display the specified resource.
     */
    public function indexUnos(Request $request)
    {
        $search = $request->input('search');

        $avisos = Avisos::where('avi_titulo', 'like',  "%{$search}%")
            ->orderBy('avi_titulo')
            ->orderBy('avi_fchpublica', 'DESC')
            ->paginate(10)
            ->withQueryString();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Avisos $avisos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

public function update(Request $request, $id)
{
    //
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avisos $avisos)
    {
        //
    }
}
