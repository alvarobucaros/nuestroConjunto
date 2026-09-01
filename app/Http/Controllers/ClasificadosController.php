<?php

namespace App\Http\Controllers;
use App\Services\MailService;

use App\Models\Clasificado;
use App\Models\Conjunto;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response; // Para respuestas HTTP
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClasificadosController extends Controller
{
    protected $mailService;
  

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    /**
     * Display a listing of the resource.
     */
        public function index(Request $request)
    {
        $search = $request->input('search');

        $conjunto = Conjunto::first(); 

        $clasificados = Clasificado::where('cla_estado', 'A')                    
                    ->orderBy('cla_fchHasta')
                    ->paginate(10)
                    ->withQueryString();

        return Inertia::render('Clasificados/Index', ['conjunto' => $conjunto, 
        'clasificados'=>$clasificados, 'filters' => [
            'search' => $search,
        ], ]);
    }

    public function misclasificados(Request $request)
    {
        $search = $request->input('search');

        $conjunto = Conjunto::first(); 

        $clasificados = Clasificado::where(function($query) use ($search) 
            { $query->where('cla_titulo', 'like', "%{$search}%") 
                ->orWhere('cla_detalle', 'like', "%{$search}%"); })

            ->orderBy('cla_estado','DESC')
            ->orderBy('cla_fchPublicacion')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Clasificados/MisIndex', ['conjunto' => $conjunto, 
            'clasificados'=>$clasificados, 'filters' => [
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

        if ($request->hasFile('cla_grafica')) {
            // Obtén el archivo
            $file = $request->file('cla_grafica');

            // Genera un nombre único (puedes usar el original si prefieres)
            $filename = time() . '_' . $file->getClientOriginalName();

            // Mueve el archivo a public/logo
            $file->move(public_path('images'), $filename);

        } 

        if($request->id === '0'){

               // 1. Enviar el correo
        $hoy= date('l, F j, Y');
        $hasta = date('Y-m-d',  strtotime(date('Y-m-d'). ' + 45 days'));
        $textoCorreo = "Nombre: ".$request->cla_nombre." ".$request->cla_apellido."<br>". 
        ", Su aviso clasificado Se ha presentado correctamente hoy ". $hoy ."<br>"." el administrador lo aprobará y estará publicado hasta ".$hasta;
      
        $respuesta = $this->mailService->enviarCorreo($request->cla_email, $request->cla_titulo, $textoCorreo);

            
            Clasificado::create([
                'cla_titulo' => $request->cla_titulo,
                'cla_detalle' => $request->cla_detalle,
                'cla_nombre' => $request->cla_nombre,
                'cla_grafica' =>  $filename,        
                'cla_estado' => 'P',
                'cla_apellido' => $request->cla_apellido,
                'cla_telefonos' => $request->cla_telefonos,
                'cla_email' => $request->cla_email,
                'cla_fchPublicacion' => date('Y-m-d'),
                'cla_fchHasta' => date('Y-m-d',  strtotime(date('Y-m-d'). ' + 45 days')),
            ]);
        }
        else{
            $clasificado = Clasificado::find($request->id);
            $clasificado->cla_titulo = $request->cla_titulo;
            $clasificado->cla_detalle = $request->cla_detalle;
            $clasificado->cla_nombre = $request->cla_nombre; 
            $clasificado->cla_apellido = $request->cla_apellido;
            $clasificado->cla_telefonos = $request->cla_telefonos;
            $clasificado->cla_email = $request->cla_email; 
            $clasificado->cla_grafica = $filename;  
            $clasificado->save();
        }

        return redirect()->back()->with('success', 'Clasificado procesado exitosamente.');

       // dd('ACA store');
        // $path = 'public/nombreGrafica/' . $request->cla_grafica;
        // if (Storage::exists($path)) {
        //     Storage::delete($path);
        // } else {
        //     logger("No se encontró el archivo: $path");
        // }

        // $path=$request->file('cla_grafica')->store('nombreGrafica','public');
        // $filename = basename($path); // solo el nombre del archivo

        // $clasificado = new Clasificado();
        // $clasificado->cla_titulo = $request->cla_titulo;
        // $clasificado->cla_detalle = $request->cla_detalle;
        // $clasificado->cla_nombre = $request->cla_nombre; 
        // $clasificado->cla_apellido = $request->cla_apellido;
        // $clasificado->cla_telefonos = $request->cla_telefonos;
        // $clasificado->cla_email = $request->cla_email; 
        // $clasificado->cla_grafica = $filename;  
        // $clasificado->cla_fchPublicacion = date('Y-m-d');
        // $clasificado->cla_fchHasta = date('Y-m-d',  strtotime(date('Y-m-d'). ' + 45 days')); 
        // $clasificado->cla_estado = "P";
        // $clasificado->save();
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, Clasificados $clasificados)
    public function update(Request $request, $id)
    {
    $request->validate([
        'cla_estado' => 'required|in:P,A',
    ]);

    $registro = Clasificado::findOrFail($id);
    $registro->cla_estado = $request->cla_estado;
    $registro->save();

    return back()->with('success', 'Estado actualizado');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $clasificado = Clasificado::find($id);
        if (!$clasificado) {
            return response()->json(['message' => 'clasificado no encontrado'], Response::HTTP_NOT_FOUND);
        }
        
        if (Storage::disk('public')->exists('nombreGrafica/' . $clasificado->cla_grafica)) {
            
           Storage::disk('public')->delete('nombreGrafica/' . $clasificado->cla_grafica);
        }

        $clasificado->delete();

         return redirect()->back()->with('success','clasificado eliminado correctamente');
    }
}
