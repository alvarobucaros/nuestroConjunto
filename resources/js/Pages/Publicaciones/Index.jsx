import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import { useRef, useState, useEffect, React } from 'react';
import { Head ,useForm, usePage, router , Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';
import MiTextArea from '@/Components/MiTextArea';
import MiSelectDinamico from '@/Components/MiSelectDinamico';
import axios from 'axios';  // Importa axios


export default function Publicaciones(props, filters) {
    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get('/publicaciones', { search }, { preserveState: true, replace: true });
        }, 500); // debounce de 500ms

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const [graficaPreview, setGraficaPreview] = useState(null);
    const [anexoPreview, setAnexoPreview] = useState(null);

    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
      id:'',
      pub_grafica:null,
      pub_titulo:'',
      pub_detalle:'',
      pub_anexo:null,
    });
 
    const [role, setRole] = useState(user.role) 

    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Añadir aviso');
            setData({pub_grafica:null,
                 pub_titulo:'',
                  pub_detalle:'', 
                  pub_anexo:null
                });       
        }
        else{
            setTitle('Modificar aviso');
        }
    }

    const closeModal = () =>{
        setModal(false);
    }

    const save = (e) =>{
        e.preventDefault();
        if(validate()){
        if(operation === 1){  
            try {
                const response = Inertia.post(`/publicaciones`, data);
                alert('Datos actualizados exitosamente');
             //   console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al crear el registro:', error);
            }
        }
        else{      
            try {
                const response = Inertia.put(`/publicaciones/${data.id}`, data);
                alert('Datos actualizados exitosamente');
             //   console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al actualizar  el registro:', error);
            }
            setModal(false);
        }
      }else{
          alert('Error en la validación de datos');
      }
    }
 
    const eliminar = (id, pub_titulo) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar esta publicacion '+id + ' '+pub_titulo,
            text:'Se perderá la publicacion',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/publicaciones/${id}`, {
                    onSuccess: () => {
                        alert('aviso eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar publicacion:', errors);
                    },
                });
            }
        });
    }

    const [loading, setLoading] = useState(false);

  
    //  Médotos usados en la pagina

    useEffect(() => {
            let objectUrl = null;
    
            if (data.pub_grafica instanceof File || data.pub_grafica instanceof Blob) {
                objectUrl = URL.createObjectURL(data.pub_grafica);
                setGraficaPreview(objectUrl);
            } else if (typeof data.pub_grafica === 'string') {
                // Si ya es una URL, úsala directamente
                setGraficaPreview(data.con_logo);
            } else {
                setGraficaPreview(null);
            }
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [data.pub_grafica]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/publicaciones', { search }, { preserveState: true, replace: true });
    }; 

    
    function validate(){
        return(true)
    }

      const handleChange = (event) => {
        const { name, value } = event.target;
        setData(Data => {
            const newData = {
                ...Data,
                [name]: value
            };
  
            return newData;
        });
    };

    
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors} conjunto={props.conjunto} >
            <div className="p-6">
            {role !== 'User' && (
                <> 
                    <button
                        className="bg-blue-500 text-white px-4 py-1 rounded mb-4"
                        onClick={() => openModal(1)}
                        > Crear Aviso 
                    </button>
                </>
            )}
            <Link
                href="/mimenu"
                className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
                > Regreso
            </Link>
            <input
                type="text"
                placeholder="Buscar por título o detalle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-2 py-1 mb-4"
            />
            {/* <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Buscar por título o detalle..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-2 py-1 mb-4"
                />
                <button type="submit" className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
                    Buscar
                </button>
            </form> */}
            <span className='mx-10 bg-blue-100'> AVISOS </span> 
            <div className="bg-white grid v-screen place-items-center py-1 text-xs">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>
                            <th className='px-2 py-1'>TITULO</th>
                            <th className='px-2 py-1'>DESCRIPCION</th>
                            <th className='px-2 py-1'>ANEXO</th>
                            <th className='px-2 py-1'>GRAFICA</th>
                            <th className='px-2 py-1' colSpan={2}></th>
         
                        </tr>
                    </thead>

                    <tbody>
                        {props.publicaciones.data.map((publicacion) => (
                            <tr key={publicacion.id} className='text-xs'>
                                <td className='border border-gray-400 px-2 py-1'>{publicacion.id}</td>                                  
                                <td className='border border-gray-400 px-2 py-1'>{publicacion.pub_titulo}</td>
                                <td className='border border-gray-400 px-2 py-1'>{publicacion.pub_detalle}</td>
                                <td className='border border-gray-400 px-2 py-1'>{publicacion.pub_anexo}</td>
                                <td className='border border-gray-400 px-2 py-1'>{publicacion.pub_grafica}</td>
    
                                {role !== 'User' && (
                                          <> {/* <-- Fragmento  para agrupar los td */}
                                    <td className='border border-gray-400 px-2 py-1'>
                                        <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => {
                                            setData(publicacion); // Precarga los datos en el formulario
                                            openModal(0);                                          
                                        }}
                                        >
                                        Editar
                                        </button>
                                    </td>
                                    <td className='border border-gray-400 px-2 py-1'>
                                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                        onClick={() => eliminar(publicacion.id,publicacion.pub_titulo)}>
                                        Eliminar
                                        </button>
                                    </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <Pagination class="mt-6" links={props.publicaciones.links} />
            </div>    
            <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title} 
                </h2>
                 <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form onSubmit={save}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <MiInput  Id="pub_titulo" Type="text" Label="Título" onChange={handleChange}
                            classNameI="md:col-span-2" maxLength ="150" data ={data.pub_titulo} required={true}
                            OnChange = {handleChange} ></MiInput>
                            
                            <MiTextArea  Id="pub_detalle"  Label="Detalle" onChange={handleChange}
                            classNameI="" Rows ="2"  Cols="100" data ={data.pub_detalle} required={true}  
                            OnChange = {handleChange} ></MiTextArea>
      
                            <MiInput  Id="pub_anexo" Type="text" Label="Anexo en PDF" onChange={handleChange}
                            classNameI="md:col-span-2" maxLength ="150" data ={data.pub_anexo} required={true}
                            OnChange = {handleChange} ></MiInput>

       
                            <div className="sm:col-span-2">
                                <label htmlFor="pub_grafica" className="block text-sm/6 font-semibold text-gray-900">Soporte gráfico</label>
                                <div className="mt-0.5">
                                <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    <input id="pub_grafica" type="file" name="pub_grafica" defaultValue={data.pub_grafica} required={true} onChange = {handleChange}  
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                </div>
                                </div>
                            </div>
                

                            <div className="flex justify-end">
                                <button type="button"
                                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => setModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button processing={processing}
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold mx-3 py-1 px-1 rounded'>
                                     Guardar
                                </button>
                            </div>
                        </div>                      
                    </form>
                </div>
            </Modal>
        </div>
        </AuthenticatedLayout>
    );
}
