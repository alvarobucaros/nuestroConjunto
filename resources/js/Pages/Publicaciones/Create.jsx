
import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function Create() {
    // Inicializa el hook useForm con los campos de tu tabla
    const { data, setData, post, processing, errors, progress } = useForm({
        pub_titulo: '',
        pub_detalle: '',
        pub_grafica: null, // Puedes manejarlo como un input de texto o como otro campo
        pub_anexo: null, // El archivo se inicializa como null
    });

    // Función que se ejecuta al enviar el formulario
    function handleSubmit(e) {
        e.preventDefault();
        // El método 'post' de useForm enviará los datos a la ruta 'publicaciones.store'
        // Inertia detectará el objeto File y enviará la petición como multipart/form-data
        post(route('publicaciones.store'));
    }

    return (
        <div>
            <Head title="Crear Publicación" />
            <h1>Crear Nueva Publicación</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="pub_titulo">Título</label>
                    <input
                        type="text"
                        id="pub_titulo"
                        value={data.pub_titulo}
                        onChange={(e) => setData('pub_titulo', e.target.value)}
                    />
                    {errors.pub_titulo && <div className="error">{errors.pub_titulo}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="pub_detalle">Detalle</label>
                    <textarea
                        id="pub_detalle"
                        value={data.pub_detalle}
                        onChange={(e) => setData('pub_detalle', e.target.value)}
                    ></textarea>
                    {errors.pub_detalle && <div className="error">{errors.pub_detalle}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="pub_grafica">Gráfica (Dibujo)</label>
                    <input
                        type="file"
                        id="pub_grafica"
                        accept=".png"
                        onChange={(e) => setData('pub_grafica', e.target.files[0])}
                    />
                    {errors.pub_grafica && <div className="error">{errors.pub_grafica}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="pub_anexo">Anexo (PDF)</label>
                    {/* Para los archivos, el evento es 'onChange' y se accede a los archivos con e.target.files[0] */}
                    <input
                        type="file"
                        id="pub_anexo"
                        accept=".pdf" // Opcional: limita la selección de archivos a PDF
                        onChange={(e) => setData('pub_anexo', e.target.files[0])}
                    />
                    {errors.pub_anexo && <div className="error">{errors.pub_anexo}</div>}
                </div>

                {/* Barra de progreso para la subida del archivo */}
                {progress && (
                  <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                  </progress>
                )}

                <button className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4" type="submit" disabled={processing}>
                    Guardar Publicación
                </button>
            </form>
        </div>
    );
}
