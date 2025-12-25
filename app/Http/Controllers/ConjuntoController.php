<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Conjunto;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP 
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class  ConjuntoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $conjunto = Conjunto::first();

        if (!$conjunto) {
            $conjunto = new Conjunto();
        }
   
        return Inertia::render('Conjuntos/Index',['conjuntos'=>$conjunto]); 
    
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $conjunto = Conjunto::first();
   
        if ($conjunto) {
            return response()->json($conjunto, 200);
        } else {
            return response()->json(['message' => 'conjunto not found'], 404);
        }
    }
    

    public function store(Request $request)
    {  
     
        $conjunto = Conjunto::find($request->id);

        $request-> validate([
            'con_nombre' => 'required|max:100',
            'con_direccion' => 'required|max:100',
            'con_ciudad' => 'required|max:100',
            'con_tipodoc' => 'required|max:100',
            'con_nrodoc' => 'required|max:100',
            'con_telefono' => 'required|max:100',
            'con_email' => 'required|max:100',
            'con_comentarios' => 'nullable',   
            'con_horario' => 'nullable',      
            'con_radicadoconsec'  => 'nullable', 
        ]);
  

        if ($conjunto->con_logo && file_exists(public_path('logo/' . $conjunto->con_logo))) {
            unlink(public_path('logo/' . $conjunto->con_logo));
        }

        if ($request->hasFile('con_logo')) {
            // Obtén el archivo
            $file = $request->file('con_logo');

            // Genera un nombre único (puedes usar el original si prefieres)
            $filename = time() . '_' . $file->getClientOriginalName();

            // Mueve el archivo a public/logo
            $file->move(public_path('logo'), $filename);

        }


        $conjunto->con_nombre = $request->con_nombre;            
        $conjunto->con_direccion = $request->con_direccion;
        $conjunto->con_ciudad = $request->con_ciudad;
        $conjunto->con_tipodoc = $request->con_tipodoc;
        $conjunto->con_nrodoc = $request->con_nrodoc;
        $conjunto->con_telefono = $request->con_telefono;
        $conjunto->con_email = $request->con_email;
        $conjunto->con_comentarios = $request->con_comentarios;
        $conjunto->con_horario = $request->con_horario;
        $conjunto->con_radicadoconsec = $request->con_radicadoconsec;

        $conjunto->con_logo =  $filename ;
        $conjunto->con_comentarios = $request->con_comentarios;


          $conjunto->update(); 
        
        return redirect()->back()->with('success', 'conjunto creado exitosamente.');
    }

 
    public function update(Request $request, Conjunto $conjunto)
    {

    //   dd($conjunto->con_nombre);
        $validated = $request->validate([
            'con_nombre' => 'max:100',
            'con_direccion' => 'nullable|max:100',
            'con_ciudad' => 'max:100',
            'con_tipodoc' => 'max:100',
            'con_nrodoc' => 'max:100',
            'con_telefono' => 'max:100',
            'con_email' => 'max:100',
            'con_logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', 
            'con_comentarios' => 'nullable',   
            'con_horario' => 'nullable',      
            'con_radicadoconsec'  => 'nullable',   
        ]);
        

        if($request->hasFile('con_logo')){
            if($conjunto->con_logo){  // eliminar el anterior
                Storage::delete($conjunto->con_logo);
            }
             $validated['con_logo'] = $request->file('con_logo')->store('logos', 'public');
        }


        $conjunto = Conjunto::find($conjunto->id);
   
            $conjunto->con_nombre = $request->con_nombre;            
            $conjunto->con_direccion = $request->con_direccion;
            $conjunto->con_ciudad = $request->con_ciudad;
            $conjunto->con_tipodoc = $request->con_tipodoc;
            $conjunto->con_nrodoc = $request->con_nrodoc;

            $conjunto->con_telefono = $request->con_telefono;
            $conjunto->con_email = $request->con_email;
            $conjunto->con_comentarios = $request->con_comentarios;
            $conjunto->con_horario = $request->con_horario;
            $conjunto->con_radicadoconsec = $request->con_radicadoconsec;

            if($request->hasFile('con_logo')){
                $path=$request->file('con_logo')->store('nombreGrafica','public');
                $conjunto->con_logo = $path;
            }

        dd($conjunto);
             $conjunto->update(); 

        return redirect()->back()->with('success', 'conjunto actualizado correctamente');
    }

  

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $conjuntos = Conjunto::find($id);
        if (!$conjuntos) {
            return response()->json(['message' => 'conjunto no encontrada'], Response::HTTP_NOT_FOUND);
        }
        $conjuntos->delete();

         return redirect()->back()->with('success','conjunto eliminada correctamente');
        
    }

    
}