import { useState, React, useEffect, useCallback} from 'react';
import { Head, usePage, router,useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/components/Card';
import Swal from 'sweetalert2';
import TextInput from '@/components/TextInput2';
import TextAreaInput from '@/components/TextAreaInput2';
import MiLista from '@/Components/MiLista';


export default function Tramites(props, conjunto, op) {

  const user = usePage().props.auth.user;
  
  const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
      id: 0,  
      cla_grafica: null,
      cla_titulo: '',
      cla_detalle: '',
      cla_nombre: '',
      cla_apellido: '',
      cla_telefonos: '',
      cla_email: '',
      cla_fchPublicacion: '',
      cla_fchHasta: '',
      cla_estado: 'C',  
    });

  const initialFormData = {
        id: 0,
      cla_grafica: null,
      cla_titulo: '',
      cla_detalle: '',
      cla_nombre: '',
      cla_apellido: '',
      cla_telefonos: '',
      cla_email: '',
      cla_fchPublicacion: '',
      cla_fchHasta: '',
      cla_estado: 'C',  
  };

  const [formData, setFormData] = useState(initialFormData);

  const [graficaPreview, setGraficaPreview] = useState(null);

  const tipoDocOptions = [
      { value: '', label: '-- Seleccione tipo documento --' }, // O pción por defecto/placeholder
      { value: 'N', label: 'Nit' },
      { value: 'C', label: 'Cédula Ciudadanía' },
      { value: 'E', label: 'Cédula Extranjería' },
      { value: 'R', label: 'Permiso permanencia' },
      { value: 'P', label: 'Pasaporte' },
  ];

      useEffect(() => {
          let objectUrl = null;
  
          if (formData.cla_grafica instanceof File || formData.cla_grafica instanceof Blob) {
              objectUrl = URL.createObjectURL(formData.cla_grafica);
              setGraficaPreview(objectUrl);
          } else if (typeof formData.cla_grafica === 'string') {
              // Si ya es una URL, úsala directamente
              setGraficaPreview(formData.cla_grafica);
          } else {
              setGraficaPreview(null);
          }
        return () => {
          if (objectUrl) {
              URL.revokeObjectURL(objectUrl);
          }
      };
      }, [formData.cla_grafica]);
  
      const handleChange = useCallback((e) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
      }, []);
   
      const handleSubmit = (e) => {
          e.preventDefault();
          
          router.post('/clasificados', formData, {
              onSuccess: () => {             
                  setFormData(initialFormData);
                  alert('Datos del formulario actualizados.');
              },
              onError: (errors) => { /* Manejar errores de validación */ },
          });
        
      };
  
  const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, cla_grafica: file }));
        }
    }, []);

  return (
      <AuthenticatedLayout auth={props.auth} conjunto={props.conjunto}
      >
        <div className="mb-6 text-center">
            <Head title="Clasificados" />         
        </div>
        <div>
            <div className=' flex justify-center'>
                <Card className="w-full max-w-4xl ">
                <h2 className="text-center block text-md font-medium text-blue-700 dark:text-gray-300 mb-1 ">Digite acá su aviso clasificado, al aprobarlo se publicará por 30 días</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    
                        <form onSubmit={handleSubmit} className="">
                            <TextInput label="Nombres" name="cla_nombre" value={formData.cla_nombre} onChange={handleChange} placeholder="Sus nombres" required />
                            <TextInput label="Apellidos" name="cla_apellido" value={formData.cla_apellido} onChange={handleChange} placeholder="Sus apellidos" required />
                            <TextInput label="Teléfono" name="cla_telefonos" value={formData.cla_telefonos} onChange={handleChange} placeholder="301..." required />
                            <TextInput label="E-Mail" name="cla_email" type="mail" value={formData.cla_email} onChange={handleChange} placeholder="email@com.co" required />
                            <TextInput label="Título aviso" name="cla_titulo" value={formData.cla_titulo} onChange={handleChange} placeholder="Título clasificado" required />
                            {/* <TextInput label="Detalle del aviso" name="cla_detalle" type="text" value={formData.cla_detalle} onChange={handleChange} placeholder="Contenido del clasificado" required /> */}
                            <div className="md:col-span-2">
                                <TextAreaInput label="Detalles Adicionales" name="cla_detalle" value={formData.cla_detalle} onChange={handleChange}
                                rows={2} cols={140}   placeholder="Información relevante ." />
                            </div>                       
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div>
                                <label className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-1">
                                    Gráfica que acompaña
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-600 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {formData.cla_grafica && (
                                        <img src={`/images/${formData.cla_grafica}`} alt="Gráfica a cargar" className="h-10 w-16 aspect-square focus:ring-4" />
                                        )}
                                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                            <label htmlFor="cla_grafica" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Subir un archivo</span>
                                                <input id="cla_grafica" name="cla_grafica" type="file" className="sr-only" 
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
        </div>
    </AuthenticatedLayout>
  );
}