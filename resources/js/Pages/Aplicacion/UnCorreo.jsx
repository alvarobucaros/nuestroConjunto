
import MiInput from '@/Components/MiInput';
import MiTextArea from '@/components/MiTextArea';
import { useState, React, useCallback } from 'react';
import { router} from '@inertiajs/react';

export default function UnCorreo() {

   const initialFormData= {
       email:'alvaro.oycsoft@gmail.com', 
       subject:'Prueba de correo desde Laravel',
       body:'Este es un correo de prueba enviado desde una aplicación Laravel usando PHPMailer.', 
    };


    const [formData, setFormData] = useState(initialFormData);

      const handleChange = useCallback((e) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
      }, []);
  

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/sendmail', formData, {
            onSuccess: () => {             
                setFormData(initialFormData);
                alert('Datos enviados ...');
            },
            onError: (errors) => { /* Manejar errores de validación */ },
        });      
    };             

    return (
        <div className="p-6 bg-white border-b border-gray-200">
            <h1>Esta es la página de un correo para pruebas</h1>
            <div className="bg-gray-200 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <MiInput  Id="email" Type="mail" Label="Correo " onChange={handleChange}
                            classNameI="md:col-span-2"
                        maxLength ="100" data ={formData.email} required={true}
                        OnChange = {handleChange} ></MiInput>

                        <MiInput  Id="subject" Type="text" Label="Asunto" onChange={handleChange}
                            classNameI="md:col-span-2"
                        maxLength ="100" data ={formData.subject} required={true}
                        OnChange = {handleChange} ></MiInput>

                        <MiTextArea Id="body"  Rows="10" Cols="4" Label="Detalle" classNameI="" 
                        data ={formData.body}  OnChange={handleChange}>
                        </MiTextArea>

                        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-4 rounded mb-4'>
                            enviar
                        </button>
                            
                    </div>  
                </form>                    
            </div>
        </div>
        
    );
}
