<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\AppController;   //controladora general de la aplicacion

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;

use App\Http\Controllers\UserController; 
use App\Http\Controllers\ComunicadosController;
use App\Http\Controllers\ConjuntoController;
use App\Http\Controllers\ClasificadosController;
use App\Http\Controllers\ContactosController;
use App\Http\Controllers\PublicacionesController;
use App\Http\Controllers\TramiteController;
use App\Http\Controllers\AvisosController;
use App\Http\Controllers\PHPMailerController;

Route::get('/', [AppController::class, 'index'])->name('/');

Route::get('send',[AppController::class, 'correo'])->name('send');
Route::get('uncorreo',[AppController::class, 'uncorreo'])->name('uncorreo');

Route::get('sendmail', [PHPMailerController::class, 'index'])->name('sendmail');
Route::post('/sendmail', [PHPMailerController::class, 'store'])->name('sendmail.store');

Route::get('/avisos', [AvisosController::class, 'index'])->name('avisos');
Route::get('/unosavisos', [AvisosController::class, 'indexUnos'])->name('indexUnos');
Route::post('/avisos', [AvisosController::class, 'store'])->name('avisos.store');
Route::put('/avisos/{id}', [AvisosController::class, 'update'])->name('avisos.update');
Route::delete('/avisos/{id}', [AvisosController::class, 'destroy'])->name('avisos.destroy');
 
 
Route::get('/tramites', [TramiteController::class, 'indexVer'])->middleware(['auth', 'verified'])->name('tramites');
Route::get('/mimenu', [AppController::class, 'indexMenu'])->middleware(['auth', 'verified'])->name('mimenu');
Route::get('/docs', [AppController::class, 'indexDoc'])->middleware(['auth', 'verified'])->name('docs');
Route::get('/carga', [AppController::class, 'carga'])->middleware(['auth', 'verified'])->name('carga');
Route::get('/tramites/{op}', [TramiteController::class, 'index'])->middleware(['auth', 'verified'])->name('tramites');
Route::post('/tramites', [TramiteController::class, 'store'])->name('tramites.store');
Route::put('/tramites/{id}', [TramiteController::class, 'update'])->name('tramites.update');
Route::delete('/tramites/{id}', [TramiteController::class, 'destroy'])->name('tramites.destroy');


Route::get('/misclasificados', [ClasificadosController::class, 'misclasificados'])->name('misclasificados');
Route::get('/clasificados', [ClasificadosController::class, 'index'])->name('clasificados');
Route::get('/clasificados/{id}', [ClasificadosController::class, 'show'])->name('clasificados.show');
Route::post('/clasificados', [ClasificadosController::class, 'store'])->name('clasificados.store');
Route::put('/clasificados/{id}', [ClasificadosController::class, 'update'])->name('clasificados.update');
Route::delete('/clasificados/{id}', [ClasificadosController::class, 'destroy'])->name('clasificados.destroy');

Route::get('/contactos', [ContactosController::class, 'index'])->name('contactos');
Route::get('/miscontactos', [ContactosController::class, 'misIndex'])->name('miscontactos');
Route::get('/contactos/{id}', [ContactosController::class, 'show'])->name('contactos.show');
Route::post('/contactos', [ContactosController::class, 'store'])->name('contactos.store');
Route::put('/contactos/{id}', [ContactosController::class, 'update'])->name('contactos.update');
Route::delete('/contactos/{id}', [ContactosController::class, 'destroy'])->name('contactos.destroy');

Route::get('/comunicados', [ComunicadosController::class, 'index'])->name('comunicados');
Route::get('/comunicados/{id}', [ComunicadosController::class, 'show'])->name('comunicados.show');
Route::post('/comunicados', [ComunicadosController::class, 'store'])->name('comunicados.store');
Route::put('/comunicados/{id}', [ComunicadosController::class, 'update'])->name('comunicados.update');
Route::delete('/comunicados/{id}', [ComunicadosController::class, 'destroy'])->name('comunicados.destroy');

// esto es nuevo
Route::post('/publicaciones', [AppController::class, 'store'])->name('publicaciones.store');
// También podrías necesitar una ruta para mostrar el formulario
Route::get('/publicaciones/crear', [AppController::class, 'create'])->name('publicaciones.create');
Route::get('/publicaciones', [PublicacionesController::class, 'index'])->name('publicaciones');
Route::get('/publicaciones/{id}', [PublicacionesController::class, 'show'])->name('publicaciones.show');
Route::post('/publicaciones', [PublicacionesController::class, 'store'])->name('publicaciones.store');
Route::put('/publicaciones/{id}', [PublicacionesController::class, 'update'])->name('publicaciones.update');
Route::delete('/publicaciones/{id}', [PublicacionesController::class, 'destroy'])->name('publicaciones.destroy');

Route::get('/dashboard', [AppController::class, 'indexPost'])->middleware(['auth', 'verified'])->name('dashboard');

// opciones del menú  

Route::get('/conjunto', [ConjuntoController::class, 'index'])->name('conjunto');
Route::get('/conjunto/{id}', [ConjuntoController::class, 'show'])->name('conjunto.show');
Route::post('/conjunto', [ConjuntoController::class, 'store'])->name('conjunto.store');
//Route::put('/conjunto/{id}', [ConjuntoController::class, 'update'])->name('conjunto.update');
Route::delete('/conjunto/{id}', [ConjuntoController::class, 'destroy'])->name('conjunto.destroy');

Route::put('/conjunto/{conjunto}', [ConjuntoController::class, 'update'])->name('conjunto.update');

Route::get('/post', [PostController::class, 'index'])->name('post');
Route::get('/post', [PostController::class, 'index'])->name('post');
Route::get('/post/{id}', [PostController::class, 'show'])->name('post.show');
Route::post('/post', [PostController::class, 'store'])->name('post.store');
Route::put('/post/{id}', [PostController::class, 'update'])->name('post.update');
Route::delete('/post/{id}', [PostController::class, 'destroy'])->name('post.destroy');

Route::get('/user', [UserController::class, 'index'])->name('user');
Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');
Route::post('/user', [UserController::class, 'store'])->name('user.store');
Route::put('/user/{id}', [UserController::class, 'update'])->name('user.update');
Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.destroy');

Route::middleware('auth')->group(function () {
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
