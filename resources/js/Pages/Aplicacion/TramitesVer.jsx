import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Inertia } from '@inertiajs/inertia';
import MiModal from '@/Components/MiModal';
import { useState, useEffect, React, useCallback } from 'react';
import { Head ,useForm, usePage, router,  Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import MiInput from '@/Components/MiInput';
import MiTextArea from '@/components/MiTextArea';

export default function tramites(props, filters) {

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
        'tra_nombre':'',  
        'tra_apellido':'',  
        'tra_direccion':'',  
        'tra_ciudad':'',  
        'tra_tipodoc':'',  
        'tra_nrodoc':'',  
        'tra_telefono':'',  
        'tra_email':'',  
        'tra_texto':'',  
        'tra_radicado':'',  
        'tra_fechaevento':'',  
        'tra_fechasolicitud':'',  
        'tra_horadesde':'',  
        'tra_horahasta':'',  
        'tra_observaciones':'',  
        'tra_estado':'',  
        'tra_fecharespuesta':'',  
        'tra_opcion':'',
    });

    const fechaActual = () =>{
         const fecha = new Date().toISOString().split('T')[0]; // formato como 'yyyy-mm-dd'
        setHoy(fecha);
        data.tra_fecharespuesta = fecha;
    }
      
    useEffect(() => {
    if (search) {
        const delayDebounceFn = setTimeout(() => {
            router.get('/tramites', { search }, { preserveState: true, replace: true });
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }
    }, [search]); // solo depende de search

    useEffect(() => {
        fechaActual();
    }, []);

    const [conjunto, setConjunto] = useState(props.conjunto);

    const [role, setRole] = useState(user.acceso) 

     const [showModal, setShowModal] = useState(false);
    
    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        setTitle('Modificar un tramite');
    }

    const closeModal = () =>{
        setModal(false);
    }

    const [isVisible, setIsVisible] = useState(false);

    const estados = {
        P: 'Presentado',
        C: 'Cerrado',
    };

     const tramiteOptions = {
        S: 'Parqueadero u otros',
        T: 'Solicitud de trasteo',
        A: 'Alquiler de salones',
        P: 'Paz y Salvo',        
     }

     //  Método para el formulario

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/tramites', { search }, { preserveState: true, replace: true });
    }; 

    function validate(){
        return(true)
    }


    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
            setData(name, value);
    };

     const handleUpdate = () => {
        // Aquí puedes hacer una petición Inertia.post o Inertia.put
        //   console.log('Actualizando...');
        setShowModal(false);
                   
                try {
                    const response = Inertia.put(`/tramites/${data.id}`, data);
                    alert('Datos actualizados exitosamente');
                 //   console.log('Respuesta:', response);
                } catch (error) {
                 //   console.error('Error al actualizar el Asunto:', error);
                }
      };


    const save = (e) =>{
        e.preventDefault();
        if(validate()){    
          //  const formData = new FormData();
                try {
                    const response = Inertia.put(`/tramites/${data.id}`, data);
                    alert('Datos actualizados exitosamente');
                   // console.log('Respuesta:', response);
                } catch (error) {
                    console.error('Error al actualizar el tramites:', error);
                }
                setModal(false);
        }else{
            alert('Error en la validación de datos');
        }
    }

    const eliminar = (id, tra_radicado, operacion,  tra_nombre, tra_apellido) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar el tramite '+tra_radicado + ' ' +operacion+' de '+tra_nombre + ' ' + tra_apellido,
            text:'Se perderá el tramite',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/tramites/${id}`, {
                    onSuccess: () => {
                        alert('grupo eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar el grupo:', errors);
                    },
                })
            }
        });
    }


  return (
    <AuthenticatedLayout conjunto={props.conjunto}>
   <div>
        <Head title="tramites" />
        <div className="p-6">
   
            <Link
                href="/mimenu"
                className="bg-green-400 text-white px-4 py-1 mx-4 rounded mb-4"
                > Regreso
            </Link>
            <input
                type="text"
                placeholder="Buscar por usuario.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-2 py-1 mb-4"
            />
            <span className='mx-10 mt-2 text-blue-500 font-bold text-sm text-center'> TRAMITES PENDIENTES POR REALIZAR </span> 
            <div className="relative">
 
            </div>
            <div className="bg-white grid v-screen place-items-center py-1 text-xs">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>                            
                            <th className='px-2 py-1'>TRAMITE</th>
                            <th className='px-2 py-1'>RADICADO</th>
                            <th className='px-2 py-1'>FCH CREA</th>                            
                            <th className='px-2 py-1'>USUARIO</th>
                            <th className='px-2 py-1'>DOCUMENTO</th>                           
                            <th className='px-2 py-1'>DETALLES</th>
                            <th className='px-2 py-1'>ESTADO</th>
                            {role !== 'super' && (
                            <th className='px-2 py-1' colSpan={2}>COMANDOS</th>
                            )}
                        </tr>
                    </thead>
             
                    <tbody>
                        {props.tramites.data.map((tramite) => (
                            <tr key={tramite.id} className='text-xs'>
                                <td className='border border-gray-400 px-2 py-1'>{tramite.id} </td>
                                <td className='border border-gray-400 px-2 py-1'>{tramiteOptions[tramite.tra_opcion]}    </td> 
                                <td className='border border-gray-400 px-2 py-1'>{tramite.tra_radicado}</td>  
                                <td className='border border-gray-400 px-2 py-1'>{tramite.tra_fechasolicitud}</td>           
                                <td className='border border-gray-400 px-2 py-1'>{tramite.tra_nombre}  {tramite.tra_apellido}</td>
                                <td className='border border-gray-400 px-2 py-1'>{tramite.tra_tipodoc}  {tramite.tra_nrodoc}</td>
                                {tramite.tra_opcion === 'A' ? (
                                     <td className='border border-gray-400 px-2 py-1'>{tramite.tra_texto}&nbsp;&nbsp;  
                                    el dia {tramite.tra_fechaevento} desde las {tramite.tra_horadesde} hasta {tramite.tra_horahasta}
                                     </td>
                               ): tramite.tra_opcion === 'T' ? (                                      
                                    <td className='border border-gray-400 px-2 py-1'>{tramite.tra_texto}&nbsp; 
                                    el dia {tramite.tra_fechaevento}</td> 
                                ):(
                                    <td className='border border-gray-400 px-2 py-1'>{tramite.tra_texto}</td>
                                )}
                                
                                <td className='border border-gray-400 px-2 py-1'>
                                    {estados[tramite.tra_estado] || 'Desconocido'}
                                </td>
 
                                {role !== 'C' && (
                                      <> {/* <-- Fragmento  para agrupar los td */}
                                <td className='border border-gray-400 px-2 py-1'>

                                    <button
                                    className="bg-gray-400 hover:bg-gray-700 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setData(tramite); // Precarga los datos en el formulario
                                        setShowModal(true)                                       
                                    }}
                                    >
                                    Procesar
                                    </button>
                                </td>
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button className='bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => eliminar(tramite.id, tramite.tra_radicado,
                                        tramiteOptions[tramite.tra_opcion],tramite.tra_nombre,tramite.tra_apellido)}>
                                    Eliminar
                                    </button>
                                </td>
                                </>
                            )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <Pagination  class="mt-6" links={props.tramites.links} />
            </div>    
                <MiModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onUpdate={handleUpdate}
                >
                <h2 className="mt-2 text-blue-500 font-bold text-sm text-center">
                     {title}
                </h2> 

                 <div className="bg-gray-200 rounded-lg shadow-lg">
                        <form onSubmit={save}>
                            <div className="">
                                <p className="mb-2  px-2 py-1"> <span className=" font-bold ">{tramiteOptions[data.tra_opcion] || 'Desconocido'}&nbsp;&nbsp; Trámite De </span>{data.tra_nombre} {data.tra_apellido}
                                <span className=" font-bold  px-2 py-1 mx-2">Radicado</span>  {data.tra_radicado} <span className=" font-bold"> De </span> {data.tra_fechasolicitud}</p>
                                
                                {data.tra_opcion === 'A' ? (
                                     <p className=' px-2 py-1'> <span className=" font-bold  ">Mensaje : </span> {data.tra_texto}&nbsp;&nbsp;  
                                    el dia {data.tra_fechaevento}&nbsp;&nbsp;   desde las {data.tra_horadesde} hasta {data.tra_horahasta}
                                     </p>
                               ): data.tra_opcion === 'T' ? (                                      
                                    <p className=' px-2 py-1'> <span className=" font-bold  ">Mensaje : </span> {data.tra_texto}&nbsp; 
                                    el dia {data.tra_fechaevento}</p> 
                                ):(
                                    <p className=' px-2 py-1'> <span className=" font-bold  ">Mensaje : </span> {data.tra_texto}</p>
                                )}

                                <p className=' px-2 py-1'> <span className=" font-bold  ">Datos del solicitante : </span></p>
                                <div className='flex flex-row items-center gap-4 '>
                                    <p className=' px-10 py-1'> Telefono : </p>
                                    <p className=''>  {data.tra_telefono}</p>
                                </div>
                                <div className='flex flex-row items-center gap-4 '>
                                    <p className=' px-10 py-1'> Correo : </p>
                                    <p className=''>  {data.tra_email}</p>
                                </div>
{/* tra_direccion,tra_ciudad,tra_tipodoc,tra_nrodoc,,,,tra_observaciones,tra_estado,tra_fecharespuesta,   tra_opcion  FROM tramites;
        */}                               
<hr />
                            <MiInput  Id="tra_fecharespuesta" Type="date" Label="Fecha Respuesta" onChange={handleChange}
                             classNameI="md:col-span-2"
                            maxLength ="100" data ={data.tra_fecharespuesta} required={true}
                            OnChange = {handleChange} ></MiInput>

                                <MiTextArea Id="tra_observaciones"  Rows="10" Cols="4" Label="Respuesta" classNameI="" 
                                data ={data.tra_observaciones}  OnChange={handleChange}>
                                </MiTextArea>
                                  
                                  </div>  
                        </form>                    
                    </div>                         
   
            </MiModal>
        </div>
    </div>
    </AuthenticatedLayout>
  );
}