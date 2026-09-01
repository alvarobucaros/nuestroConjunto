import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import { useState, useEffect, React, useCallback } from 'react';
import { Head ,useForm, usePage, router,  Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import MiInput from '@/Components/MiInput';
import TextAreaInput from '@/components/TextAreaInput2';


export default function clasificados(props, filters) {


    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const [search, setSearch] = useState(filters.search || '');

    const [hoy, setHoy] = useState(new Date().toISOString().slice(0, 10));


    const [dias, setDias] = useState('');

    const [graficaPreview, setGraficaPreview] = useState(null);
  
    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        'id':'',
        'cla_estado': '',       
        'cla_grafica':'',
        'cla_titulo':'',
        'cla_detalle':'',
        'cla_nombre':'',
        'cla_apellido':'',
        'cla_telefonos':'',
        'cla_email':'',
        'cla_fchPublicacion':'',
        'cla_fchHasta':'',       
    });

    const initialFormData = {
        'id':'',  
        'cla_grafica':'',
        'cla_titulo':'',
        'cla_detalle':'',
        'cla_nombre':'',
        'cla_apellido':'',
        'cla_telefonos':'',
        'cla_email':'',
        'cla_fchPublicacion':'',
        'cla_fchHasta':'',
        'cla_estado':'',
    };

    const [conjunto, setConjunto] = useState(props.conjunto);

    const [formData, setFormData] = useState(initialFormData);

    const [role, setRole] = useState(user.acceso) 
    
    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        setTitle('Aprobar un clasificado');
    }
    
    const closeModal = () =>{
        setModal(false);
    }

    const [isVisible, setIsVisible] = useState(false);

    const estados = {
        P: 'Presentado',
        A: 'Aprobado',
    };
    
        // Métodos de la página 
    useEffect(() => {
    if (search) {
        const delayDebounceFn = setTimeout(() => {
            router.get('/misclasificados', { search }, { preserveState: true, replace: true });
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }
    }, [search]); // solo depende de search


    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.id > 0) {
            put(route('clasificados.update', data.id), {
            data,
            onSuccess: () => {
                alert('Datos del formulario actualizados.');
                setModal(false);
            },

            });
        } else {
            post(route('clasificados.store'), {
            data,
            onSuccess: () => alert('Clasificado creado'),
            });
        }
    };
    
    const eliminar = (id,cla_titulo,cla_detalle,cla_nombre,cla_apellido) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar este registro '+cla_titulo + ' ' +cla_detalle+' de '+cla_nombre + ' ' + cla_apellido,
            text:'Se perderá el registro',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/clasificados/${id}`, {
                    onSuccess: () => {
                        alert('registro eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar el registro:', errors);
                    },
                });
            }
        });
        }

      return (
          <AuthenticatedLayout auth={props.auth} conjunto={props.conjunto}
          >
          <div className="mb-6 text-center">
              <Head title="Clasificados" />         
          </div>
           <Link
                href="/mimenu"
                className="bg-green-400 text-white px-4 py-1 mx-4 rounded mb-4"
                > Regreso
            </Link>
            <input
                type="text"
                placeholder="Buscar por título o detalle... "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-2 py-1 mb-4"
            />
            <span className='mx-10 mt-2 text-blue-500 font-bold text-sm text-center'> CLASIFICADOS PENDIENTES POR AUTORIZAR A HOY:  {hoy} </span> 

            <div className="bg-white grid v-screen place-items-center py-1 text-xs">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>                            
                            <th className='px-2 py-1'>TITULO</th>
                            <th className='px-2 py-1'>DETALLE</th>
                            <th className='px-2 py-1'>USUAIO</th>                            
                            <th className='px-2 py-1'>TELEFONO</th>
                            <th className='px-2 py-1'>CORREO</th>                           
                            <th className='px-2 py-1'>FECHA</th>
                            <th className='px-2 py-1'>HASTA</th>
                            <th className='px-2 py-1'>ESTADO</th>
                            <th className='px-2 py-1'>GRAFICA</th>
                            {role !== 'super' && (
                            <th className='px-2 py-1' colSpan={2}>COMANDOS</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {props.clasificados.data.map((clasificado) => (
                            <tr key={clasificado.id} className='text-xs'>
                                <td className='border border-gray-400 px-2 py-1'>{clasificado.id} </td>
                                <td className='border border-gray-400 px-2 py-1'>{clasificado.cla_titulo} </td> 
                                <td className='border border-gray-400 px-2 py-1'>{clasificado.cla_detalle}</td>  
                                <td className='border border-gray-400 px-2 py-1'>{clasificado.cla_nombre}  {clasificado.cla_apellido}</td>
                                <td className='border border-gray-400 px-2 py-1'>{clasificado.cla_telefonos}</td>     
                                <td className='border border-gray-400 px-2 py-1'>{clasificado.cla_email}  </td>      
                                <td className='border border-gray-400 px-2 py-1'>{clasificado.cla_fchPublicacion}  </td>
                               <td
  className={`border border-gray-400 px-2 py-1 ${
    hoy > clasificado.cla_fchHasta ? 'text-red-500 font-semibold' : ''
  }`}
>
  {clasificado.cla_fchHasta}
</td>                    
                                <td className='border border-gray-400 px-2 py-1'>
                                {clasificado.cla_grafica ? (
                                   
                                    <img
                                        src={`/images/${clasificado.cla_grafica}`}
                                        alt="Ver Imagen"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                    
                                ) : (
                                    <span></span>
                                )}
                                </td>
                                <td className='border border-gray-400 px-2 py-1'>
                                    {estados[clasificado.cla_estado] || 'Desconocido'}
                                </td>
                                {role !== 'C' && (
                                      <> {/* <-- Fragmento  para agrupar los td */}
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button
                                    className="bg-gray-400 hover:bg-gray-700 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setData(clasificado); // Precarga los datos en el formulario
                                        openModal(0);                                          
                                    }}
                                    >
                                    Editar
                                    </button>
                                </td>
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button className='bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => eliminar(clasificado.id,clasificado.cla_titulo,
                                    clasificado.cla_detalle,clasificado.cla_nombre,
                                    clasificado.cla_apellido)}>
                                    Eliminar
                                    </button>
                                </td>
                                </>
                            )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <Pagination  class="mt-6" links={props.clasificados.links} />
            </div>  
            <Modal show={modal} onClose={closeModal}>
                <h2 className="mt-2 text-blue-500 font-bold text-sm text-center">
                     {title}
                </h2> 
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form  onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div className="md:col-span-2">
                                {data.cla_grafica && (
                                <img src={`/images/${data.cla_grafica}`} alt="Gráfica a cargar" className="h-20 w-32 aspect-square focus:ring-4" />
                                )}
                            </div>
                                 
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-blue-500"> Título </label>
                                <label className="block text-sm font-medium text-gray-700"> {data.cla_titulo} </label>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-blue-500"> Detalle </label>
                                <label className="block text-sm font-medium text-gray-700"> {data.cla_detalle} </label>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-blue-500"> Usuario </label>
                                <label className="block text-sm font-medium text-gray-700"> {data.cla_nombre}   {data.cla_apellido}</label>
                            </div> 
                         <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-blue-500"> Teléfono y Correo </label>
                                <label className="block text-sm font-medium text-gray-700"> {data.cla_telefonos}  {data.cla_email}  </label>
                            </div> 
                         <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-blue-500"> Fecha publicación </label>
                                <label className="block text-sm font-medium text-gray-700"> {data.cla_fchPublicacion}</label>
                            </div>                                                         
                                                    
                        <div className="grid sm:grid-cols-2 gap-2">
                            <label className="flex p-3 w-full bg-white border rounded-lg">
                                <input  type="radio"  name="cla_estado" value="P"
                                checked={data.cla_estado === 'P'}
                                onChange={(e) => setData('cla_estado', e.target.value)}
                                className="shrink-0 mt-0.5"  />
                                <span className="ms-3">Presentado</span>
                            </label>

                            <label className="flex p-3 w-full bg-white border rounded-lg">
                                <input type="radio" name="cla_estado" value="A"
                                checked={data.cla_estado === 'A'}
                                onChange={(e) => setData('cla_estado', e.target.value)}
                                className="shrink-0 mt-0.5" />
                                <span className="ms-3">Aprobado</span>
                            </label>
                        </div>



                            <hr />
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
          </AuthenticatedLayout>
      )

}