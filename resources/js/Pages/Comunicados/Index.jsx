import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import { useRef, useState, useEffect, React } from 'react';
import { Head ,useForm, usePage, router,  Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';
import MiTextArea from '@/Components/MiTextArea';


export default function Comunicados(props, filters) {
    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const [search, setSearch] = useState(filters.search || '');

    const [hoy, setHoy] = useState('');

    const [graficaPreview, setGraficaPreview] = useState(null);

    const [conjunto, setConjunto] = useState(props.conjunto);

    useEffect(() => {
                // fecha de hoy
        const fechaActual = new Date().toISOString().split('T')[0]; // formato como 'yyyy-mm-dd'
        setHoy(fechaActual);

            let objectUrl = null;
    
            if (data.com_grafica instanceof File || data.com_grafica instanceof Blob) {
                objectUrl = URL.createObjectURL(data.com_grafica);
                setGraficaPreview(objectUrl);
            } else if (typeof data.com_grafica === 'string') {
                // Si ya es una URL, úsala directamente
                setGraficaPreview(data.com_grafica);
            } else {
                setGraficaPreview(null);
            }
          return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
        }, []);

  
    const { data,setData,delete:destroy,post,put,processing,reset,errors} = useForm({
       'id':'0',    
       'com_tipo':'',  
       'com_grafica':null,  
       'com_titulo':'',  
       'com_detalle':'',  
       'com_anexo':null,  
       'com_fechaPublicacion':'',  
       'com_estado':'A',  
    });
    const initialFormData = {
        'id':'0',    
       'com_tipo':'',  
       'com_grafica':null,  
       'com_titulo':'',  
       'com_detalle':'',  
       'com_anexo':null,  
       'com_fechaPublicacion':'',  
       'com_estado':'A',  
    };

    const [formData, setFormData] = useState(initialFormData);

    const [role, setRole] = useState(user.acceso) 
    
    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Adicionar comunicado');
            setData({   
                'id':'0',      
                'com_tipo':'',  
                'com_grafica':null,  
                'com_titulo':'',  
                'com_detalle':'',  
                'com_anexo':null,  
                'com_fechaPublicacion':'',  
                'com_estado':'A',  
            });     
            }
        else{
            setTitle('Modificar comunicado');
        }
    }

    const closeModal = () =>{
        setModal(false);
    }

    const [isVisible, setIsVisible] = useState(false);

    const tipoOptions = [
        { value: '', label: '-- Selecciona un tipo --' }, // O pción por defecto/placeholder
        { value: 'O', label: 'Comunidad' },
        { value: 'N', label: 'Normatividad' },
        { value: 'C', label: 'Contratación' },
    ];

    const tipos = {
        O: 'Comunidad',
        N: 'Normatividad',
        C: 'Contratación',
    };
 
    const estadoOptions = [
        { value: '', label: '-- Selecciona un estado --' }, // O pción por defecto/placeholder
        { value: 'A', label: 'Activo' },
        { value: 'I', label: 'Inactivo' },
    ];
  
    const estados = {
        A: 'Activo',
        I: 'Inactivo'
    };

     //  Método para el formulario

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/publicaciones', { search }, { preserveState: true, replace: true });
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
            formData.append('com_tipo', data.com_tipo);
            formData.append('com_titulo', data.com_titulo);
            formData.append('com_detalle', data.com_detalle);
            formData.append('com_fechaPublicacion', data.com_fechaPublicacion);
            formData.append('com_estado', data.com_estado);

            // Agrega los archivos si existen
            if (data.com_grafica) {
                formData.append('com_grafica', data.com_grafica);
            }
            if (data.com_anexo) {
                formData.append('com_anexo', data.com_anexo);
            }

            // Enviar con Inertia usando FormData
            if(operation === 1){ 
                Inertia.post('/comunicados', formData, {
                    forceFormData: true, // 👈 Esto es clave para que Inertia no lo convierta a JSON
                    onSuccess: () => {
                        alert('Datos actualizados exitosamente');
                    },
                    onError: (errors) => {
                        console.error('Error al crear el comunicado:', errors);
                    }
                });
            }
            else{  
                try {
                    const response = Inertia.put(`/comunicados/${data.id}`, formData);
                    alert('Datos actualizados exitosamente');
                  //  console.log('Respuesta:', response);
                } catch (error) {
                    console.error('Error al actualizar el comunicados:', error);
                }
                setModal(false);
            }

        }else{
            alert('Error en la validación de datos');
        }
    }
 
    const eliminar = (id, com_titulo,  com_detalle) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar el comunicado '+id + ' '+com_titulo+' '+com_detalle,
            text:'Se perderá el çomunicad',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/çomunicados/${id}`, {
                    onSuccess: () => {
                        alert('çomunicad eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar el çomunicad:', errors);
                    },
                });
            }
        });
    }


    // Función que se ejecuta al enviar el formulario
   
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Agrega todos los campos
        formData.append('id', data.id);
        formData.append('com_tipo', data.com_tipo);
        formData.append('com_grafica', data.com_grafica);
        formData.append('com_titulo', data.com_titulo);
        formData.append('com_detalle', data.com_detalle);
        formData.append('com_anexo', data.com_anexo);
        formData.append('com_fechaPublicacion', data.com_fechaPublicacion);
        formData.append('com_estado', data.com_estado);

        router.post('/comunicados', formData, {
            onSuccess: () => {             
                alert('Comunicado actualizado exitosamente');
            },
            onError: (errors) => { /* Manejar errores de validación */ },
        });
        
      };

    function handleSubmitUUUU(e) {
        e.preventDefault();
        if(data.id > 0){
          //  Inertia.put(`/comunicados/${data.id}`, data);
            put(route('comunicados.update',data.id), {
            data,
            onSuccess: () => {
            alert('Comunicado actualizado exitosamente');
            },
        });
        }else{
        post(route('comunicados.store'),       
         {
            data,
            onSuccess: () => {
            alert('Comunicado creado exitosamente');
            },
        });
    }
    }

    const handlePdfClick = (comunicado) => {
        if (comunicado.com_anexo) {
           
            window.open(`/anexos/${comunicado.com_anexo}`, '_blank');
        }else{
            alert ('no muestra')
        }
    };

  return (
    <AuthenticatedLayout conjunto={props.conjunto}>
   <div>
        <Head title="comunicadoes" />
        <div className="p-6">
            {role !== 'C' && (
                <> 
                    <button
                        className="bg-blue-400 text-white px-4 py-1 rounded mb-4"
                        onClick={() => openModal(1)}
                        > Crear Comunicado 
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
                placeholder="Buscar por título o detalle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-2 py-1 mb-4"
            />
            <span className='mx-10 mt-2 text-blue-500 font-bold text-sm text-center'> COMUNICADOS </span> 
            <div className="relative">
        

            </div>
            <div className="bg-white grid v-screen place-items-center py-1 text-xs">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>
                            <th className='px-2 py-1'>TIPO</th>
                            <th className='px-2 py-1'>TITULO</th>
                            <th className='px-2 py-1'>DETALLE</th>
                            <th className='px-2 py-1'>FCH CREA</th>
                            <th className='px-2 py-1'>GRAFICA</th>
                            <th className='px-2 py-1'>ANEXO</th>
                            <th className='px-2 py-1'>ESTADO</th>
                            {role !== 'super' && (
                            <th className='px-2 py-1' colSpan={2}>COMANDOS</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {props.comunicados.data.map((comunicado) => (
                            <tr key={comunicado.id} className='text-xs'>
                                <td className='border border-gray-400 px-2 py-1'>{comunicado.id}</td>                      
                                <td className='border border-gray-400 px-2 py-1'> {tipos[comunicado.com_tipo] || 'Desconocido'} </td>
                                <td className='border border-gray-400 px-2 py-1'>{comunicado.com_titulo}</td>
                                <td className='border border-gray-400 px-2 py-1'>{comunicado.com_detalle}</td>
                                <td className='border border-gray-400 px-2 py-1'>{comunicado.com_fechaPublicacion}</td>
                               
                                <td className='border border-gray-400 px-2 py-1'>
                                {comunicado.com_grafica ? (
                                   
                                    <img
                                        src={`/images/${comunicado.com_grafica}`}
                                        alt="Ver Imagen"
                                        style={{ width: '30px', height: '30px' }}
                                    />
                                    
                                ) : (
                                    <span></span>
                                )}
                                </td>
                               <td className='border border-gray-400 px-0 mx-5 py-1 w-1/64'>
                                    {comunicado.com_anexo ? ( 
                                    <div onClick={()=> {
                                        handlePdfClick(comunicado); 
                                    }} style={{ cursor: 'pointer' }}>
                                        <img
                                            src="../images/pdf.jpg" 
                                            alt="Ver PDF"
                                            style={{ width: '30px', height: '30px' }} 
                                        />                                            
                                    </div>
                                ) : (
                                    <span></span>
                                )}
                                </td>
       
                                <td className='border border-gray-400 px-2 py-1'>
                                    {estados[comunicado.com_estado] || 'Desconocido'}
                                </td>
 
                            {role !== 'C' && (
                                      <> {/* <-- Fragmento  para agrupar los td */}
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button
                                    className="bg-gray-400 hover:bg-gray-700 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setData(comunicado); // Precarga los datos en el formulario
                                        openModal(0);                                          
                                    }}
                                    >
                                    Editar
                                    </button>
                                </td>
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button className='bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => eliminar(comunicado.id,comunicado.com_titulo,comunicado.com_detalle)}>
                                    Eliminar
                                    </button>
                                </td>
                                </>
                            )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <Pagination  class="mt-6" links={props.comunicados.links} />
            </div>    
            <Modal show={modal} onClose={closeModal}>
                <h2 className="mt-2 text-blue-500 font-bold text-sm text-center">
                     {title}
                </h2>
               
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                            <MiLista Id="com_tipo"  Label="Tipo comunicado"  data ={data.com_tipo} 
                            options = {tipoOptions} OnChange={handleChange} required={true}></MiLista>

                            <MiInput  Id="com_titulo" Type="text" Label="Título" onChange={handleChange}
                             classNameI="md:col-span-2"
                            maxLength ="100" data ={data.com_titulo} required={true}
                            OnChange = {handleChange} ></MiInput>

                            <MiTextArea  Id="com_detalle"  Label="Detalle" onChange={handleChange}
                             classNameI="md:col-span-2"  Rows="2" Cols="120"
                            maxLength ="400" data ={data.com_detalle} required={true}
                            OnChange = {handleChange} ></MiTextArea>                            

                             <MiInput  Id="com_fechaPublicacion" Type="date" Label="Fecha publicación" onChange={handleChange}
                            maxLength ="100" data ={data.com_fechaPublicacion} required={true}
                            OnChange = {handleChange} ></MiInput>  

                            <div className="sm:col-span-2">
                                <label htmlFor="com_anexo" className="block text-sm font-medium text-gray-700">
                                Anexo en pdf</label>
                                <div className="mt-0.5">
                                    <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                        <input id="com_anexo" type="file" name="com_anexo" 
                                        accept="application/pdf"  onChange = {handleChange}  
                                       className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 border-gray-300`}/>
                                    </div>
                                </div>
                                {data.com_anexo && (
                                <p className="text-sm text-black mt-1">
                                    Archivo seleccionado: {data.com_anexo.name}
                                </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div>
                                    <label className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-1">
                                        Gráfica que acompaña
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-600 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">

                                            <img src={`/images/${data.com_grafica}`} alt="Gráfica a cargar" className="h-10 w-16 aspect-square focus:ring-4" />
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label htmlFor="com_grafica" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Subir un archivo</span>
                                                    <input id="com_grafica" name="com_grafica" type="file" className="sr-only" 
                                                    onChange={handleChange} accept="image/png, image/jpeg, image/gif" />
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
                            {/* <div className="sm:col-span-2">
                                <label htmlFor="com_grafica" className="block text-sm font-medium text-gray-700">
                                Grafica acompañante</label>
                                <div className="mt-0.5">
                                    <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                        <input id="com_grafica" type="file" name="com_grafica"
                                        accept="image/jpeg, image/jpg"  onChange = {handleChange}  
                                       className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 border-gray-300`}/>
                                    </div>
                                </div>
                                <img
                                        src={`/images/${data.com_grafica}`}
                                        alt="Ver Imagen"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                {data.com_grafica && (
                                <p className="text-sm text-black mt-1">
                                    Gráfica seleccionada: {data.com_grafica.name}
                                </p>
                                )}
                            </div>                             */}


                            <MiLista Id="com_estado"  Label="Estado"  data ={data.com_estado} 
                            options = {estadoOptions} OnChange={handleChange} required={true}></MiLista>

                            <div className="flex justify-end">
                                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded'>
                                    Guardar
                                </button>

                                <button type="button"
                                    className='mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => setModal(false)}
                                > Cancelar
                                </button>

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