import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import { useRef, useState, useEffect, React } from 'react';
import { Head ,useForm, usePage, Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function Contactos(props) {

    const [conjunto, setConjunto] = useState(props.conjunto);

    const fechaActual = new Date().toISOString().split('T')[0]; // 'yyyy-mm-dd'
    const radicadoInicial = fechaActual.substring(2, 4) + fechaActual.substring(5, 7) + fechaActual.substring(8, 10); // 'yymmdd'

    const [hoy] = useState(fechaActual);
    const [radicado] = useState(radicadoInicial);
  
    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        id:'',    
        con_nombres:'',
        con_apellidos:'',  
        con_tipopqr:'',
        con_email:'',
        con_telefono:'',
        con_mensaje:'',
        con_soportepdf:null,
        con_secuencia:'0',
        con_fechaRecibo:hoy,
        con_estado:'I',
        con_respuesta:'',
        con_fechaRespuesta:'',
        con_radicado:radicado,
    });

    const [isVisible, setIsVisible] = useState(false);

    const tipoOptions = [
        { value: '', label: '-- Selecciona un tipo --' }, // O pción por defecto/placeholder
        { value: 'P', label: 'Petición' },
        { value: 'Q', label: 'Queja' },
        { value: 'R', label: 'Reclamo' },
        { value: 'S', label: 'Solicitud' },
        { value: 'C', label: 'Comentario' },
    ];
 
  
    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setData(name, files[0]); // aquí capturas el archivo
        } else {
            setData(name, value);
        }
        if (name === 'con_tipopqr'){
            data.con_radicado = value+radicado+'-'+conjunto.con_radicadoconsec;
        }
    };


    // Función  que se ejecuta al enviar el formulario
   
    function handleSubmit(e) {
        e.preventDefault();

        post(route('contactos.store'), {
            onSuccess: () => {
            regresar(data.con_radicado);
            },
        });
    }
    
    const regresar = (radicado) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Su asunto fué enviado para ser atendido ',
            icon:'success',
               text:'Radicado Nr ' + radicado ,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Regresar',
        }).then((result) => {
            if (result.isConfirmed) {
            router.visit('/');
            }
        });
    }

  return (
    <AuthenticatedLayout conjunto={conjunto}>
   <div>
   <div className="isolate bg-white  px-6 py-2 sm:py-2 lg:px-8">

    <div className="mx-auto max-w-2xl text-center">
        <p className="text-xm font-semibold text-teal-500">Preguntas, Quejas, Reclamos, Solicitudes, Comentarios</p>
    </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-2">        
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="con_nombres" className="block text-sm/6 font-semibold text-gray-900">Nombre</label>
                    <div className="mt-0.5">
                    <input id="con_nombres" type="text" name="con_nombres" defaultValue={data.con_nombres} required={true} onChange = {handleChange}  
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                    </div>
                </div>
                <div>
                    <label htmlFor="con_apellidos" className="block text-sm/6 font-semibold text-gray-900">Apellido</label>
                    <div className="mt-0.5">
                    <input id="con_apellidos" type="text" name="con_apellidos" defaultValue={data.con_apellidos} required={true} onChange = {handleChange}  
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                    </div>
                </div>
                
                <div className="sm:col-span-2">
                    <label htmlFor="con_tipopqr" className="block text-sm/6 font-semibold text-gray-900">Tipo</label>
                    <select id="con_tipopqr" name="con_tipopqr"  defaultValue={data.con_tipopqr}  required={true} onChange = {handleChange}  
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        {tipoOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="con_email" className="block text-sm/6 font-semibold text-gray-900">Correo</label>
                    <div className="mt-0.5">
                    <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                        <input id="con_email" type="email" name="con_email" defaultValue={data.con_email}  required={true} onChange = {handleChange}  
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                    </div>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="con_telefono" className="block text-sm/6 font-semibold text-gray-900">Teléfono</label>
                    <div className="mt-0.5">
                    <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                        <input id="con_telefono" type="text" name="con_telefono" defaultValue={data.con_telefono} required={true} onChange = {handleChange}  
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                    </div>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="con_mensaje" className="block text-sm/6 font-semibold text-gray-900">Mensaje</label>
                    <div className="mt-0.5">
                    <textarea id="con_mensaje" name="con_mensaje" rows="3"  defaultValue={data.con_mensaje} required={true} onChange = {handleChange}  
                    className="block w-full rounded-md bg-white px-3.5 py-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="con_soportepdf" className="block text-sm/6 font-semibold text-gray-900">
                    Soporte en pdf</label>
                    <div className="mt-0.5">
                    <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                        <input id="con_soportepdf" type="file" name="con_soportepdf" defaultValue={data.con_soportepdf}
                        accept="application/pdf"  onChange = {handleChange}  
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                    </div>
                    </div>
                    {data.con_soportepdf && (
                    <p className="text-sm text-black mt-1">
                        Archivo seleccionado: {data.con_soportepdf.name}
                    </p>
                    )}
                </div>

                <div className="mt-10">
                <button type="submit" className="block w-full rounded-md bg-blue-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Enviar
                </button>
                </div>
                <div className="mt-10">
                    <Link
                        href="/"
                        className="block w-full rounded-md bg-green-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        > Regreso
                    </Link>       
                </div>
                {isVisible && (
                <div>
                    <input type="text" name="con_secuencia" id="con_secuencia"  defaultValue={data.con_secuencia} />
                    <input type="text" name="con_estado" id="con_estado"  defaultValue={data.con_estado} />
                    <input type="text" name="con_respuesta" id="con_respuesta"  defaultValue={data.con_respuesta} />
                    <input type="date" name="con_fechaRecibo" id="con_fechaRecibo"  defaultValue={data.con_fechaRecibo} />
                    <input type="date" name="con_radicado" id="con_radicado"  defaultValue={data.con_radicado} />
                    <input type="date" name="con_fechaRespuesta" id="con_fechaRespuesta"  defaultValue={data.con_fechaRespuesta} />
                </div>
                )}
            </div>

        </form>
    </div>
    </div>
    </AuthenticatedLayout>
  );
}