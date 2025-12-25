import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';

import { useRef, useState, React } from 'react';
import { Head ,useForm, usePage, Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from    '@/Components/Pagination';
import MiModal from       '@/Components/MiModal';
import MiTextArea from    '@/Components/MiTextArea';
import MiRadioButton from '@/Components/MiRadioButton';


export default function Contactenos(props) {

    const user = usePage().props.auth.user;
    const [role, setRole] = useState(user.acceso) 

    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const [conjunto, setConjunto] = useState(props.conjunto);

    const [showModal, setShowModal] = useState(false);

    const [isVisible, setIsVisible] = useState(false);

    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        id:'', 
        con_nombres:'', 
        con_apellidos:'', 
        con_tipopqr:'', 
        con_email:'', 
        con_telefono:'', 
        con_mensaje:'', 
        con_soportepdf:'',      
        con_secuencia:'',
        con_fechaRecibo:'',  
        con_estado:'',
        con_respuesta:'',
        con_fechaRespuesta:'',
        con_radicado:'',
        con_enviar:'N',
    });
 
    
    
    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Añadir asunto');
            setData({  
                 con_radicado:'', 

            });     
            }
        else{
            setTitle('Actualiza asunto');
        }
    }
  
    const closeModal = () =>{
        setModal(false);
    }  
    
    const estadoOptions = [
        { value: '', label: '-- Selecciona un estado --' },    
        { value: 'I', label: 'Iniciado' },
        { value: 'P', label: 'Pendiente' },
        { value: 'T', label: 'Terminado' },
    ];

    const estados = {
        I: 'Iniciado',
        P: 'Pendiente',
        T: 'Terminado',
    };

    const enviarEmail ={
        S: 'Si, enviar',
        N: 'NO',
    }

    const tipoOptions = [
        { value: '', label: '-- Selecciona un tipo --' }, // O pción por defecto/placeholder
        { value: 'P', label: 'Petición' },
        { value: 'Q', label: 'Queja' },
        { value: 'R', label: 'Reclamo' },
        { value: 'S', label: 'Solicitud' },
    ];

    const opcionesPqr = {    
        P: 'Petición',
        Q: 'Queja',
        R: 'Reclamo',
        S: 'Solicitud',
        C: 'Comentario'
    }

    const save = (e) =>{
        e.preventDefault();
        if(validate()){
            data.con_enviar='N';
            try {
                const response = Inertia.put(`/contactos/${data.id}`, data);
                alert('Datos actualizados exitosamente');
             //   console.log('Respuesta:', response);
            } catch (error) {
             //   console.error('Error al actualizar el Asunto:', error);
            }
            setModal(false);
       // }
    }else{
        alert('Error en la validación de datos');
    }
    }
 
    const eliminar = (id, con_nombre) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar el contacto '+id + ' '+con_nombre,
            text:'Se perderá el contacto',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/contactos/${id}`, {
                    onSuccess: () => {
                        alert('asunto eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        alert('Error al eliminar el asunto:');
                   //     console.error('Error al eliminar el asunto:', errors);
                    },
                });
            }
        });
    }


    //  Médotos usados en la pagina

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

  const handleChangeEstado = () => {
    setData('estado', !data.estado);
    patch(route('tareas.update', id)); // Ajusta la ruta según tu recurso
  };

 const handleUpdate = () => {
    // Aquí puedes hacer una petición Inertia.post o Inertia.put
    //   console.log('Actualizando...');
    setShowModal(false);
               
            try {
                const response = Inertia.put(`/contactos/${data.id}`, data);
                alert('Datos actualizados exitosamente');
             //   console.log('Respuesta:', response);
            } catch (error) {
             //   console.error('Error al actualizar el Asunto:', error);
            }
  };

      const handlePdfClick = (data) => {
     //   alert('ver pdf');
        if (data.con_soportepdf) {
            //   window.open(data.con_soportepdf, '_blank');
            window.open(`/anexos/${data.con_soportepdf}`, '_blank');
        }else{
            alert ('no muestra')
        }
    };

    
    
    return (
        <AuthenticatedLayout conjunto={conjunto}>
            <Head title="asuntos" />
            <div className="p-6">
                <Link
                    href="/mimenu"
                    className="bg-green-400 text-white px-4 py-1 mx-4 rounded mb-4"
                    > Regreso 
                </Link>

                <span className='mt-2 text-blue-500 font-bold text-sm text-center'> ASUNTOS POR RESOLVER (CONTACTOS) </span>  {role}
                <div className="bg-white grid v-screen place-items-center py-1 text-xs">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='px-2 py-1'>#</th>
                                <th className='px-2 py-1'>NOMBRE</th>
                                <th className='px-2 py-1'>CORREO</th>
                                <th className='px-2 py-1'>TELEFONO</th>
                                <th className='px-2 py-1'>FECHA</th>
                                <th className='px-2 py-1'>MENSAJE</th>
                                <th className='px-2 py-1'>SOPORTE</th>
                                <th className='px-2 py-1'>RESPUESTA</th>
                                <th className='px-2 py-1'>FCH RESPUIESTA</th>
                                <th className='px-2 py-1'>ESTADO</th>    
                                <th className='px-2 py-1'>TIPO</th>                              
                                <th className='px-2 py-1'>COMANDO</th>                                
                            </tr>
                        </thead>

                        <tbody>
                            
                            {props.contactos.data.map((contacto) => (
                                <tr key={contacto.id} className='text-xs'>
                                    <td className='border border-gray-400 px-2 py-1'>{contacto.id}</td>
                                        
                                    <td className='border border-gray-400 px-2 py-1'>{contacto.con_nombres} {contacto.con_apellidos}</td>
                                    <td className='border border-gray-400 px-2 py-1'>{contacto.con_email}</td>
                                    <td className='border border-gray-400 px-2 py-1'>{contacto.con_telefono}</td>
                                    <td className='border border-gray-400 px-2 py-1'>{contacto.con_fechaRecibo}</td>
                                    <td className='border border-gray-400 px-2 py-1'>{contacto.con_mensaje.substring(0, 150)} </td>
                                    <td className='border border-gray-400 px-2 py-1'>
                                    {contacto.con_soportepdf ? (
                                        <div onClick={()=> {
                                            handlePdfClick(contacto); 
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
                                    <td className='border border-gray-400 px-2 py-1'>{contacto.con_respuesta}</td>
                                    <td className='border border-gray-400 px-2 py-1'>{contacto.con_fechaRespuesta} </td>
                                
                                    <td className='border border-gray-400 px-2 py-1'>
                                        {estados[contacto.con_estado] || 'Desconocido'}
                                    </td>
                                    <td className='border border-gray-400 px-2 py-1'>
                                        {opcionesPqr[contacto.con_tipopqr] || 'Desconocido'}
                                    </td>
    
                                {role !== 'super' && (
                                        <> 
                                    <td className='border border-gray-400 px-2 py-1'>

                                        <button
                                            onClick={() => {
                                                setData(contacto);
                                                setData(contacto.con_enviar='N');
                                                setShowModal(true)
                                            }}
                                             className="bg-blue-600 text-white px-2 py-1 rounded"
                                        >
                                            Resolver
                                        </button>
                                    </td>
     
                                    </>
                                )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination class="mt-6" links={props.contactos.links} /> 
                </div>    


                <MiModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onUpdate={handleUpdate}
                >
                
                    <div className="bg-gray-200 rounded-lg shadow-lg">
                        <form onSubmit={save}>
                            <div className="">
                                <p className="mb-2"> <span className=" font-bold ">{opcionesPqr[data.con_tipopqr] || 'Desconocido'} De </span>{data.con_nombres} {data.con_apellidos}
                                <span className=" font-bold  mx-2">Radicado</span>  {data.con_radicado} <span className=" font-bold"> De </span> {data.con_fechaRecibo}</p>
                                <p className="mb-2">  <span className=" font-bold  ">Mensaje</span>  {data.con_mensaje}</p>
                                <p>  {data.con_soportepdf ? ( 
                                        <div onClick={()=> {
                                            handlePdfClick(data); 
                                        }} style={{ cursor: 'pointer' }}>
                                            <img
                                                src="../images/pdf.jpg" 
                                                alt="Ver PDF"
                                                style={{ width: '30px', height: '30px' }} 
                                            />                                            
                                        </div>
                                    ) : (
                                        <span></span>
                                    )}</p>
                            </div>
                            <MiTextArea Id="con_respuesta"  Rows="10" Cols="8" Label="Respuesta" classNameI="" 
                            data ={data.con_respuesta}  OnChange={handleChange}>
                            </MiTextArea>

                            <MiRadioButton  
                            estados={estados}
                            selected={data.con_estado}  
                            OnChange={handleChange}
                            Label="Estado"  
                            Name="con_estado"   // <-- nombre fijo del campo
                            />

                            <MiRadioButton  estados={enviarEmail}
                            selected={data.con_enviar}  OnChange={handleChange}
                            Label="Enviar Correo" Name="con_enviar"
                            ></MiRadioButton>
                                    
                        </form>                    
                    </div>
                </MiModal>

        </div>
        </AuthenticatedLayout>
    );
}