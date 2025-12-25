<?php

namespace App\Http\Controllers;

use App\Models\Conjunto;
use App\Models\Publicacion;

use App\Models\Avisos;
use App\Models\Clasificado;
use App\Models\Comunicado;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Response; // Para respuestas HTTP

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Mail\MailableRequirimiento;

class AppController extends Controller
{

    public function correo()
    {
     
        Mail::to('alvarobucaros@hotmail.com')->send(new MailableRequirimiento);
       
        return response()->json(["message" => 'mail send succesfully']);
    }

    
    public function uncorreo()
    {
     
        // Mail::to('alvarobucaros@hotmail.com')->send(new MailableRequirimiento);
       
        // return response()->json(["message" => 'mail send succesfully']);
        return Inertia::render('Aplicacion/UnCorreo'); 
    }
        /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       
    $conjunto = Conjunto::first();
    $avisos = Avisos::latest()->paginate(10);
 //   $clasificados = Clasificado::latest()->paginate(10);
    $clasificados = Clasificado::where('cla_estado', 'A') ->paginate(10);
    $comunicados = Comunicado::orderBy('com_tipo')->latest()->paginate(10);
//dd($comunicados);
    return Inertia::render('Home', [
        'conjunto' => $conjunto,
        'avisos' => $avisos,
        'comunicados' => $comunicados,
        'clasificados' => $clasificados,
    ]);

   //     $conjunto = Conjunto::first(); 
   //     return Inertia::render('Home', ['conjunto' => $conjunto]);
    }


    public function indexMenu(Request $request)
    {      
        $conjunto = Conjunto::first();
        return Inertia::render('MiMenu', ['conjunto' => $conjunto]);        
    }

    /**
     * Muestra el formulario para crear una nueva publicación.
     */
    public function create()
    {
        return Inertia::render('Publicaciones/Create');
    }

   /**
     * Almacena una nueva publicación en la base de datos.
     */
    public function store(Request $request)
    {
        // 1. Validación de los datos
        $request->validate([
            'pub_titulo' => 'required|string|max:255',
            'pub_detalle' => 'required|string',
            'pub_grafica' => 'required|file|mimes:png|max:2048',  
            'pub_anexo' => 'required|file|mimes:pdf|max:2048', 
        ], [
            'pub_anexo.required' => 'Por favor, selecciona un archivo PDF.',
            'pub_anexo.mimes' => 'El anexo debe ser un archivo de tipo: pdf.',
            'pub_anexo.max' => 'El tamaño del PDF no debe ser mayor a 2MB.',
        ], [
            'pub_grafica.required' => 'Por favor, selecciona una Grafica.',
            'pub_grafica.mimes' => 'El anexo debe ser un archivo de tipo: png.',
            'pub_grafica.max' => 'El tamaño del PDF no debe ser mayor a 2MB.',
        ]);

        $nombreArchivoAnexo = null;
        if ($request->hasFile('pub_anexo')) {
            // 2. Guardar el archivo PDF en el servidor
            // El método store() genera un nombre de archivo único
            $path = $request->file('pub_anexo')->store('anexos_publicaciones', 'public');

           // $path = $request->file('pub_anexo')->store('public/anexos_publicaciones');
            // Obtenemos solo el nombre del archivo del path completo
            $nombreArchivoAnexo = basename($path);
        }

        $nombreGrafica = null;
        if ($request->hasFile('pub_grafica')) {
            // 2. Guardar el archivo PDF en el servidor
            // El método store() genera un nombre de archivo único
            $path = $request->file('pub_grafica')->store('anexos_graficas, public');
            // Obtenemos solo el nombre del archivo del path completo
            $nombreGrafica = basename($path);
        }
        // 3. Crear el registro en la base de datos
        Publicacion::create([
            'pub_titulo' => $request->pub_titulo,
            'pub_detalle' => $request->pub_detalle,
            'pub_grafica' => $nombreGrafica,
            'pub_anexo' => $nombreArchivoAnexo, // Guardamos solo el nombre del archivo
        ]);

        // 4. Redireccionar
        return Redirect::route('publicaciones.create')->with('success', 'Publicación creada exitosamente.');
    }

        public function show($op)
    {
       
    }
   public function tramites($op)
   
    {                

        
    }


    public function indexDoc()
    {        
        
        return Inertia::render('Documentacion');
    }

    public function carga()
    {   
        $publicaciones = Publicacion::all();
        return Inertia::render('CargaPDF', ['publicaciones' => $publicaciones]);
    }

}
