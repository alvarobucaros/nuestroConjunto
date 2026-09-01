<?php

namespace App\Http\Controllers;

use App\Models\Publicacion;
use App\Models\Conjunto;
use Illuminate\Http\Response; // Para respuestas HTTP

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $conjunto = Conjunto::first();

        $publicaciones = Publicacion::where('pub_titulo', 'like',  "%{$search}%")
                    ->orWhere('pub_descripcion', 'like',  "%{$search}%")
                    ->orderBy('pub_titulo')
                    ->paginate(10)
                    ->withQueryString();

        return Inertia::render('Publicaciones/Index', ['conjunto' => $conjunto, 
        'publicaciones' => $publicaciones, 'filters' => [
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       
    $conjunto = Conjunto::first(); 

    $publicaciones = Publicacion::where('tipo', $id)->get();

    return Inertia::render('Publicaciones/Index', ['conjunto' => $conjunto,
        'publicaciones' => $publicaciones, 'id' => $id
    ]);

    
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publicaciones $publicaciones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Publicaciones $publicaciones)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publicaciones $publicaciones)
    {
        //
    }
}
