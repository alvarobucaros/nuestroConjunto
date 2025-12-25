import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import { useState, useEffect, React, useCallback } from 'react';
import { Head ,useForm, usePage, router,  Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import MiInput from '@/Components/MiInput';
import TextAreaInput from '@/components/TextAreaInput2';

export default function avisos(props, filters) {

    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const [search, setSearch] = useState(filters.search || '');

    const [hoy, setHoy] = useState('');

    const [graficaPreview, setGraficaPreview] = useState(null);
  
    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        'id':'',    
        'avi_titulo':'',  
        'avi_subtitulo':null,  
        'avi_detalle':'',  
        'avi_grafica':'',  
        'avi_fchpublica':null,  
        'avi_estado':'',  
    });

    const initialFormData = {
        'id':null,    
        'avi_titulo':'',  
        'avi_subtitulo':'',  
        'avi_detalle':'',  
        'avi_grafica':null,  
        'avi_fchpublica':'',  
        'avi_estado':'',
    };

    useEffect(() => {
        const fechaActual = new Date().toISOString().split('T')[0]; // formato como 'yyyy-mm-dd'
        setHoy(fechaActual);

        const delayDebounceFn = setTimeout(() => {
            router.get('/avisos', { search }, { preserveState: true, replace: true });
        }, 500); // debounce de 500ms 

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const [conjunto, setConjunto] = useState(props.conjunto);

    useEffect(() => {
        let objectUrl = null;

        if (data.avi_grafica instanceof File || data.avi_grafica instanceof Blob) {
            objectUrl = URL.createObjectURL(data.avi_grafica);
            setGraficaPreview(objectUrl);
        } else if (typeof data.avi_grafica === 'string') {
            // Si ya es una URL, úsala directamente
            setGraficaPreview(data.avi_grafica);
        } else {
            setGraficaPreview(null);
        }
      return () => {
        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
        }
    };
    }, [data.avi_grafica]);


    const [formData, setFormData] = useState(initialFormData);

    const [role, setRole] = useState(user.acceso) 
    
    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Adicionar un aviso');
            setData({          
                'avi_titulo':'',  
                'avi_subtitulo':'',  
                'avi_detalle':'',  
                'avi_grafica':null,  
                'avi_fchpublica':hoy,  
                'avi_estado':'I',
            });     
            }
        else{
            setTitle('Modificar un aviso');
        }
    }

    const closeModal = () =>{
        setModal(false);
    }

    const [isVisible, setIsVisible] = useState(false);

    const estadoOptions = [
        { value: '', label: '-- Selecciona un tipo --' }, // O pción por defecto/placeholder
        { value: 'O', label: 'Iniciado' },
        { value: 'N', label: 'Aprobado' },
    ];

    const estados = {
        I: 'Iniciado',
        A: 'Aprobado',
    };


     //  Método para el formulario

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/avisos', { search }, { preserveState: true, replace: true });
    }; 

    function validate(){
        return(true)
    }


    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setData(name, files[0]); // aquí capturas el archivo
        } else {
            setData(name, value);
        }
    };


    const save = (e) =>{
        e.preventDefault();
        if(validate()){    
            const formData = new FormData();

            // Agrega todos los campos
            formData.append('avi_titulo', data.avi_titulo);
            formData.append('avi_subtitulo', data.avi_subtitulo);
            formData.append('avi_detalle', data.avi_detalle);
            formData.append('avi_fchpublica', data.avi_fchpublica);
            formData.append('avi_estado', data.avi_estado);

            // Agrega los archivos si existen
            if (data.avi_grafica) {
                formData.append('avi_grafica', data.avi_grafica);
            }  

            // Enviar con Inertia usando FormData
            if(operation === 1){ 
                Inertia.post('/avisos', formData, {
                    forceFormData: true, // 👈 Esto es clave para que Inertia no lo convierta a JSON
                    onSuccess: () => {
                        alert('Datos actualizados exitosamente');
                    },
                    onError: (errors) => {
                        console.error('Error al crear el aviso:', errors);
                    }
                });
            }
            else{  
                try {
                    const response = Inertia.put(`/avisos/${data.id}`, formData);
                    alert('Datos actualizados exitosamente');
                   // console.log('Respuesta:', response);
                } catch (error) {
                    console.error('Error al actualizar el avisos:', error);
                }
                setModal(false);
            }

        }else{
            alert('Error en la validación de datos');
        }
    }
 
    const eliminar = (id, avi_titulo,  avi_subtitulo) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar el aviso '+id + ' '+avi_titulo+' '+avi_subtitulo, 
            text:'Se perderá el aviso',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/avisos/${id}`, {
                    onSuccess: () => {
                        alert('aviso eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar el aviso:', errors);
                    },
                });
            }
        });
    }

  const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(prev => ({ ...prev, avi_grafica: file }));
        }
    }, []);
    // Función que se ejecuta al enviar el formulario
   
    const handleSubmit = (e) => {
        e.preventDefault();
            const formData = new FormData();

            // Agrega todos los campos
            formData.append('id', data.id);
            formData.append('avi_titulo', data.avi_titulo);
            formData.append('avi_subtitulo', data.avi_subtitulo);
            formData.append('avi_detalle', data.avi_detalle);
            formData.append('avi_fchpublica', data.avi_fchpublica);
            formData.append('avi_estado', data.avi_estado);

            // Agrega los archivos si existen
            if (data.avi_grafica) {
                formData.append('avi_grafica', data.avi_grafica);
            }  

        router.post('/avisos', formData, {
            onSuccess: () => {
                alert('Datos del formulario actualizados.');
            },
            
        //    onSuccess: () => { /* Manejar éxito */ },
            onError: (errors) => { /* Manejar errores de validación */ },
        });
        
    };

  return (
    <AuthenticatedLayout conjunto={props.conjunto}>
   <div>
        <Head title="avisos" />
        <div className="p-6">
            {role !== 'C' && (
                <> 
                    <button
                        className="bg-blue-400 text-white px-4 py-1 rounded mb-4"
                        onClick={() => openModal(1)}
                        > Crear Aviso
                    </button>
                </>
            )}

            <Link
                href="/mimenu"
                className="bg-green-400 text-white px-4 py-1 mx-4 rounded mb-4"
                > Regreso
            </Link>
            <input
                type="text"
                placeholder="Buscar por título o subtitulo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-2 py-1 mb-4"
            />
            <span className='mx-10 mt-2 text-blue-500 font-bold text-sm text-center'> AVISOS </span> 
            <div className="relative">

            </div>
            <div className="bg-white grid v-screen place-items-center py-1 text-xs">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>                            
                            <th className='px-2 py-1'>TITULO</th>
                            <th className='px-2 py-1'>SUBTITULO</th>
                            <th className='px-2 py-1'>DETALLE</th>                           
                            <th className='px-2 py-1'>GRAFICA</th>
                             <th className='px-2 py-1'>FCH CREA</th>
                            <th className='px-2 py-1'>ESTADO</th>
                            {role !== 'super' && (
                            <th className='px-2 py-1' colSpan={2}>COMANDOS</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {props.avisos.data.map((aviso) => (
                            <tr key={aviso.id} className='text-xs'>
                                <td className='border border-gray-400 px-2 py-1'>{aviso.id}</td>                      
                                <td className='border border-gray-400 px-2 py-1'> {aviso.avi_titulo} </td>
                                <td className='border border-gray-400 px-2 py-1'>{aviso.avi_subtitulo}</td>
                                <td className='border border-gray-400 px-2 py-1'>{aviso.avi_detalle}</td>                               
                                <td className='border border-gray-400 px-2 py-1'>
                                {aviso.avi_grafica ? (
                                    <div>
                                        <img src={`/images/${aviso.avi_grafica}`} alt="grafica acompaña" className="h-10 w-16 aspect-square focus:ring-4" />
                                    </div>
                                ) : (
                                    <span></span>
                                )}
                                </td>
                                <td className='border border-gray-400 px-2 py-1'>{aviso.avi_fchpublica}</td>
              
                                <td className='border border-gray-400 px-2 py-1'>
                                    {estados[aviso.avi_estado] || 'Desconocido'}
                                </td>
 
                            {role !== 'C' && (
                                      <> {/* <-- Fragmento para agrupar los td */}
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button
                                    className="bg-gray-400 hover:bg-gray-700 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setData(aviso); // Precarga los datos en el formulario
                                        openModal(0);                                          
                                    }}
                                    >
                                    Editar
                                    </button>
                                </td>
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button className='bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => eliminar(aviso.id,aviso.avi_titulo,aviso.avi_subtitulo)}>
                                    Eliminar
                                    </button>
                                </td>
                                </>
                            )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <Pagination  class="mt-6" links={props.avisos.links} />
            </div>    
            <Modal show={modal} onClose={closeModal}>
                <h2 className="mt-2 text-blue-500 font-bold text-sm text-center">
                     {title}
                </h2> 
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                            <MiInput  Id="avi_titulo" Type="text" Label="Título" onChange={handleChange}
                             classNameI="md:col-span-2"
                            maxLength ="100" data ={data.avi_titulo} required={true}
                            OnChange = {handleChange} ></MiInput>

                            <MiInput  Id="avi_subtitulo" Type="text" Label="Sub Título" onChange={handleChange}
                             classNameI="md:col-span-2"
                            maxLength ="100" data ={data.avi_subtitulo} required={true}
                            OnChange = {handleChange} ></MiInput>
                            <div className="md:col-span-2">
                                <TextAreaInput label="Detalles Adicionales" name="avi_detalle" value={data.avi_detalle} onChange={handleChange}
                                rows={2} cols={140}   placeholder="Información relevante ." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div>
                                    <label className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-1">
                                        Gráfica que acompaña
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-600 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">

                                            <img src={`/images/${data.avi_grafica}`} alt="Gráfica a cargar" className="h-10 w-16 aspect-square focus:ring-4" />
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label htmlFor="avi_grafica" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Subir un archivo</span>
                                                    <input id="avi_grafica" name="avi_grafica" type="file" className="sr-only" 
                                                    onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" />
                                                </label>
                                                <p className="pl-1">o arrastrar y soltar</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                        </div>
                                    </div>
                                </div>
                                {graficaPreview && (
                                    <div className="mt-2 text-center">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vista Previa</p>
                                        <img src={graficaPreview} alt="Vista previa" className="mx-auto h-32 w-32 object-contain rounded-md bg-gray-100 dark:bg-slate-700 p-1 border border-gray-300 dark:border-slate-600" />
                                    </div>
                                )}                
                            </div>                            

                            <hr />
                            <div className="border-t flex justify-end space-x-3">
                                <div className="mt-10">
                                    <Link
                                        href="/mimenu"
                                        className='bg-green-500 hover:bg-green-700 text-white px-4 py-1 mx-4 rounded mb-4'
                                        > Regreso
                                    </Link>       
                            
                                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-4 rounded mb-4'>
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>                      
                    </form>
                </div> 
            </Modal>
        </div>
    </div>
    </AuthenticatedLayout>
  );
}