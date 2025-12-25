import { useState, React , useCallback} from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/components/Card';
import TextInput from '@/components/TextInput2';
import TextAreaInput from '@/components/TextAreaInput2';
import MiLista from '@/Components/MiLista';

export default function Tramites(props, conjunto, op) {
    const user = usePage().props.auth.user;
 
    const initialFormData = {
        id: null,
        tra_nombre: '',
        tra_direccion: '',
        tra_ciudad: '',
        tra_tipodoc: '',
        tra_nrodoc: '',
        tra_telefono: '',
        tra_email: '',
        tra_texto: '',
        tra_radicado: '',
        tra_fechaevento: '',
        tra_fechasolicitud:'',
        tra_horadesde: '',
        tra_horahasta: '',
        tra_observaciones: '',
        tra_estado: '',
        tra_fecharespuesta: '',
        tra_opcion:'',
    };

    const [formData, setFormData] = useState(initialFormData);

    const fechaActual = new Date().toISOString().split('T')[0]; // 'yyyy-mm-dd'
    const radicadoInicial = fechaActual.substring(2, 4) + fechaActual.substring(5, 7) + fechaActual.substring(8, 10); // 'yymmdd'
    const [radicado] = useState(radicadoInicial);

    const horaOptions = [
        { value: '', label: '-- Seleccione hora --' }, 
        { value:  '7am', label: ' 7 am' },
        { value:  '8am', label: ' 8 am' },
        { value:  '9am', label: ' 9 am' },
        { value: '10am', label: '10 am' },
        { value: '11am', label: '11 am' },
        { value: '12am', label: '12 m'  },
        { value:  '1pm', label: ' 1 pm' },
        { value:  '2pm', label: ' 2 pm' },
        { value:  '3pm', label: ' 3 pm' },
        { value:  '4pm', label: ' 4 pm' },
        { value:  '5pm', label: ' 5 pm' },
        { value:  '6pm', label: ' 6 pm' },
        { value:  '7pm', label: ' 7 pm' },
        { value:  '8pm', label: ' 8 pm' },
        { value:  '9pm', label: ' 9 pm' },
        { value:  '10pm', label: '10 pm' },
        { value:  '11pm', label: '11 pm' },
        { value:  '12pm', label: '12 pm' },
    ];

     const tramiteOptions = {
        S: 'Solicitud parqueadero u otros',
        T: 'Solicitud de trasteo',
        A: 'Solicitud de Alquiler de salones',
        P: 'Solicitud de Paz y Salvo',        
     }

    const tipoDocOptions = [
        { value: '', label: '-- Seleccione tipo documento --' }, // O pción por defecto/placeholder
        { value: 'N', label: 'Nit' },
        { value: 'C', label: 'Cédula Ciudadanía' },
        { value: 'E', label: 'Cédula Extranjería' },
        { value: 'R', label: 'Permiso permanencia' },
        { value: 'P', label: 'Pasaporte' },
    ];

     const handleChange = useCallback((e) => {
         const { name, value } = e.target;
         setFormData(prev => ({ ...prev, [name]: value }));
     }, []);
 
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.tra_radicado =   'T'+radicado+'-'+props.conjunto.con_radicadoconsec; 
        formData.tra_estado = 'P';
        formData.tra_opcion = props.op;
        router.post('/tramites', formData, {
            onSuccess: () => {             
                setFormData(initialFormData);
                alert('Datos del formulario actualizados.');
            },
            onError: (errors) => { /* Manejar errores de validación */ },
        });
      
    };


    return (
        <AuthenticatedLayout auth={props.auth} conjunto={props.conjunto}
        >
        <div className="mb-6 text-center">
            <Head title="Trámites" />
            <span className='text-blue-600 font-bold text-lg px-4 py-1 mx-4'> {tramiteOptions[props.op] || 'Desconocido'} </span> 
        </div>
         <div className=' flex justify-center'>
            <Card className="w-full max-w-4xl ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <form onSubmit={handleSubmit} className="">
                        <TextInput label="Nombres" name="tra_nombre" value={formData.tra_nombre} onChange={handleChange} placeholder="Sus nombres" required />
                        <TextInput label="Apellidos" name="tra_apellido" value={formData.tra_apellido} onChange={handleChange} placeholder="Sus apellidos" required />
                        <TextInput label="Dirección" name="tra_direccion" value={formData.tra_direccion} onChange={handleChange} placeholder="Ej: Calle 100 # 20-30" required />
                        <TextInput label="Ciudad" name="tra_ciudad" value={formData.tra_ciudad} onChange={handleChange} placeholder="Ej: Bogotá D.C." required />
                        <MiLista Id="tra_tipodoc"  Label="Tipo Documento"  data ={formData.tra_tipodoc} 
                        options = {tipoDocOptions} OnChange={handleChange} required={true}></MiLista>
                        <TextInput label="Número de Documento" name="tra_nrodoc" value={formData.tra_nrodoc} onChange={handleChange} placeholder="Ej: 900.123.456-7" required />
                        <TextInput label="Teléfono" name="tra_telefono" type="text" value={formData.tra_telefono} onChange={handleChange} placeholder="Ej: 3001234567" required />
                        <TextInput label="Email" name="tra_email" type="email" value={formData.tra_email} onChange={handleChange} placeholder="ejemplo@conjunto.com" required />
                        {props.op === 'T'? (
                            <div>
                                <TextAreaInput label="Elementos a trastear" name="tra_texto" value={formData.tra_texto} onChange={handleChange} placeholder="Información relevante para la administración." />
                                <TextInput type="date" label="Fecha trasteo" name="tra_fechaevento" value={formData.tra_fechaevento} onChange={handleChange} placeholder="aaaa-mm-dd" required />          
                            </div>
                        ):( null )}
                        {props.op === 'S'? (
                            <div>
                                <TextAreaInput label="Detalle del  vehiculo o servicio" name="tra_texto" value={formData.tra_texto} onChange={handleChange} placeholder="Información relevante para la administración." />
                            </div>
                        ):( null )}
                        {props.op === 'A'? (
                            <div>
                                <TextAreaInput label="Salón a alquilar" name="tra_texto" value={formData.tra_texto} onChange={handleChange} placeholder="Información relevante para la administración." />
                                <TextInput type="date" label="Fecha evento" name="tra_fechaevento" value={formData.tra_fechaevento} onChange={handleChange} placeholder="aaaa-mm-dd" required />          
                                <MiLista Id="tra_horadesde"  Label="Hora inicio"  data ={formData.tra_horadesde} 
                                    options = {horaOptions} OnChange={handleChange} required={true}></MiLista>
                                <MiLista Id="tra_horahasta"  Label="Hora finalización"  data ={formData.tra_horahasta} 
                                    options = {horaOptions} OnChange={handleChange} required={true}></MiLista>
                            </div>
                        ):( null )}                    
                        <div className="border-t flex justify-end space-x-3">
                            <div className="mt-10">
                                <Link
                                    href="/"
                                    className='bg-green-500 hover:bg-green-700 text-white px-4 py-1 mx-4 rounded mb-4'
                                    > Regreso
                                </Link>       
                        
                                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-4 rounded mb-4'>
                                    Guardar
                                </button>
                            </div>
                        </div>  
                    </form>      
                </div>
            </Card>
        </div>
    </AuthenticatedLayout>
    );
}