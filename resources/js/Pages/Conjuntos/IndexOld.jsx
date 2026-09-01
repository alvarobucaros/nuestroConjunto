 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { useRef, useState, React } from 'react';
import { Head ,useForm, usePage, Link} from '@inertiajs/react';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';

export default function Conjunto(props) {

    const user = usePage().props.auth.user;
 
    const [conjunto, setConjunto] = useState(props.conjuntos);
    const [operation, setOperation] = useState('1'); 

    const { data, setData, post, submit, progress, processing, errors } = useForm({
        id: conjunto.id, 
        con_nombre: conjunto.con_nombre,
        con_direccion: conjunto.con_direccion,
        con_ciudad: conjunto.con_ciudad,
        con_tipodoc: conjunto.con_tipodoc,                        
        con_nrodoc: conjunto.con_nrodoc,
        con_telefono: conjunto.con_telefono,                         
        con_email: conjunto.con_email,                         
        con_logo: null,
        con_web: conjunto.con_web,
        con_horario: conjunto.con_horario,
        con_radicadoconsec: conjunto.con_radicadoconsec,
    });

    const tipoDocOptions = [
        { value: '', label: '-- Seleccione una opción --' }, // O pción por defecto/placeholder
        { value: 'N', label: 'Nit' },
        { value: 'C', label: 'Cédula Ciudadanía' },
        { value: 'E', label: 'Cédula Extranjería' },
    ];

    const save = (e) =>{
        e.preventDefault();
        data.logo = fileName;
        if(operation === 1){  
            try {
                const response = Inertia.post(`/conjunto`, data);
                alert('Datos actualizados exitosamente : '+data.id);
            } catch (error) {
                console.error('Error al crear la conjunto:', error);
            }
        }
        else{      
            try {
                 const response = Inertia.put(`/conjunto/${data.id}`, data);
                alert('Datos actualizados exitosamente');
              // console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al actualizar la conjunto:', error);
            }
        }
    }
     
    const eliminar = (id, con_nombre) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar la conjunto '+id + ' '+con_nombre,
            text:'Se perderá el conjunto',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/conjunto/${id}`, {
                    onSuccess: () => {
                        alert('conjunto eliminada exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar la conjunto:', errors);
                    },
                });
            }
        });
    }

    const handleSubmitSS = (e) => {
        e.preventDefault();
        submit('put', route('conjunto.update', data.id), {
        forceFormData: true,
        preserveScroll: true,
    });
};
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('conjunto.update', conjunto,id), {
            method: 'put',
            forceFormData: true,
            preserveScroll:true,
        });
              alert('Datos actualizados exitosamente : '+conjunto.id);
        //     onSuccess: () => {
        //     alert('Comunicado actualizado exitosamente');
        //     },
        // });
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setData((Data) => ({
            ...Data,
            [name]: value,
        }));
    }

    return (
    <AuthenticatedLayout conjunto={conjunto}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ">
       
            <div className="bg-white rounded-lg shadow-xl p-2 w-full max-w-lg max-h-[95vh] ">

                <div className="bg-white rounded-lg shadow-xl p-2 w-full max-w-lg max-h-[95vh] ">
                    <form onSubmit={handleSubmit}  method="POST">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                

                            <div className="border-t flex justify-end space-x-3">
                                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-4 rounded mb-4'>
                                    Guardar
                                </button>
                                <Link
                                    href="/mimenu"
                                    className="bg-green-500 bg-green-700 text-white px-4 py-1 mx-4 rounded mb-4"
                                    > Regreso
                                </Link>
                            </div>

                            <MiInput  Id="con_nombre" Type="text" Label="Nombre Conjunto" OnChange={handleChange}
                            classNameI="md:col-span-2" maxLength ="100" data ={data.con_nombre} required={true}></MiInput>
                            
                            <MiInput  Id="con_direccion" Type="text" Label="Dirección" OnChange={handleChange}
                            classNameI="md:col-span-2" maxLength ="100" data ={data.con_direccion} required={true}></MiInput>

                            <MiInput  Id="con_ciudad" Type="text" Label="Ciudad" OnChange={handleChange}
                            classNameI="" maxLength ="50" data ={data.con_ciudad} required={true}></MiInput>

                            <MiInput  Id="con_telefono" Type="text" Label="Teléfono" OnChange={handleChange}
                            classNameI="" maxLength ="50" data ={data.con_telefono} required={true}></MiInput>

                            <MiLista Id="con_tipodoc"  Label="Tipo Documento"  data ={data.con_tipodoc} 
                            options = {tipoDocOptions} OnChange={handleChange} required={true}></MiLista>

                            <MiInput  Id="con_nrodoc" Type="text" Label="Nro Documento" OnChange={handleChange}
                            classNameI="" maxLength ="50" data ={data.con_nrodoc} required={true}></MiInput>

                            <MiInput  Id="con_email" Type="text" Label="Correo" OnChange={handleChange}
                            classNameI="md:col-span-2" maxLength ="100" data ={data.con_email} required={true}></MiInput>

                            <MiInput  Id="con_horario" Type="text" Label="Horario trabajo" OnChange={handleChange}
                            classNameI="md:col-span-2" maxLength ="100" data ={data.con_horario} required={true}></MiInput>

                            <MiInput  Id="con_radicadoconsec" Type="text" Label="Nro Consecutivo radicación" OnChange={handleChange}
                            classNameI="" maxLength ="50" data ={data.con_radicadoconsec} required={true}></MiInput>
    
                            <label htmlFor='con_logo' className="block text-sm font-medium text-gray-700">Logo </label>
                            <input id="con_logo" type="file" name="con_logo" 
                             onChange={(e) => setData('con_logo', e.target.files[0])}/>
                            <img src={`/storage/${conjunto.con_logo}`} alt="Logo empresa" className="h-12 w-18 object-cover focus:ring-4 rounded-full"></img>
                            <br />   

                            {/* <div className="border-t flex justify-end space-x-3">
                                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-4 rounded mb-4'>
                                    Guardar
                                </button>
                                <Link
                                    href="/mimenu"
                                    className="bg-green-500 bg-green-700 text-white px-4 py-1 mx-4 rounded mb-4"
                                    > Regreso
                                </Link>
                            </div> */}
                            <div style={{display:'none'}}>
                                <input type="text" id="id" name="id"
                                    value='data.id' />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            </div>        
        </AuthenticatedLayout>
    );


}