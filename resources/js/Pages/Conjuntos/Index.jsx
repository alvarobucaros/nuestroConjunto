import React, { useState, useEffect, useCallback } from 'react';

import { router, Link } from '@inertiajs/react'
import Card from '@/components/Card';
import TextInput from '@/components/TextInput2';
import SelectInput from '@/components/SelectInput2';
import TextAreaInput from '@/components/TextAreaInput2';
import MiLista from '@/Components/MiLista';

export default function ConjuntoPage(props) {
    const [formData, setFormData] = useState({
        id: null,
        con_nombre: '',
        con_direccion: '',
        con_ciudad: '',
        con_tipodoc: '',
        con_nrodoc: '',
        con_telefono: '',
        con_email: '',
        con_logo: null,
        con_comentarios: '',
        con_horario: '',
        con_radicadoconsec: '',
    });

        useEffect(() => {
        if (props.conjuntos) {
            setFormData({
                id: props.conjuntos.id || null,
                con_nombre: props.conjuntos.con_nombre || '',
                con_direccion: props.conjuntos.con_direccion || '',
                con_ciudad: props.conjuntos.con_ciudad || '',
                con_tipodoc: props.conjuntos.con_tipodoc || '',
                con_nrodoc: props.conjuntos.con_nrodoc || '',
                con_telefono: props.conjuntos.con_telefono || '',
                con_email: props.conjuntos.con_email || '',
                con_logo: props.conjuntos.con_logo || null,
                con_comentarios: props.conjuntos.con_comentarios || '',
                con_horario: props.conjuntos.con_horario || '',
                con_radicadoconsec: props.conjuntos.con_radicadoconsec || '',
            });
        }
    }, [props.conjuntos]);


    const [logoPreview, setLogoPreview] = useState(null);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, con_logo: file }));
        }
    }, []);


    useEffect(() => {
        let objectUrl = null;

        if (formData.con_logo instanceof File || formData.con_logo instanceof Blob) {
            objectUrl = URL.createObjectURL(formData.con_logo);
            setLogoPreview(objectUrl);
        } else if (typeof formData.con_logo === 'string') {
            // Si ya es una URL, úsala directamente
            setLogoPreview(formData.con_logo);
        } else {
            setLogoPreview(null);
        }

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [formData.con_logo]);


    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/conjunto', formData, {
            onSuccess: () => {
              alert('Datos del formulario actualizados.');
            },
            
        //    onSuccess: () => { /* Manejar éxito */ },
            onError: (errors) => { /* Manejar errores de validación */ },
        });
      
    };

    const tipoDocOptions = [
        { value: '', label: '-- Seleccione tipo documento --' }, // O pción por defecto/placeholder
        { value: 'N', label: 'Nit' },
        { value: 'C', label: 'Cédula Ciudadanía' },
        { value: 'E', label: 'Cédula Extranjería' },
        { value: 'P', label: 'Pasaporte' },
    ];


    return (
         <div className=' flex justify-center'>
        <Card className="w-full max-w-4xl">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-blue-500 dark:text-white">Parámetrización del Conjunto</h1>
                <p className="mt-2 text-sm text-blue-600 dark:text-gray-400">
                    Complete la información del conjunto residencial.
                </p>
            </div> 

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <TextInput label="Nombre del Conjunto" name="con_nombre" value={formData.con_nombre} onChange={handleChange} placeholder="Ej: Torres del Parque" required />
                    </div>
                    <TextInput label="Dirección" name="con_direccion" value={formData.con_direccion} onChange={handleChange} placeholder="Ej: Calle 100 # 20-30" required />
                    <TextInput label="Ciudad" name="con_ciudad" value={formData.con_ciudad} onChange={handleChange} placeholder="Ej: Bogotá D.C." required />
                    <MiLista Id="con_tipodoc"  Label="Tipo Documento"  data ={formData.con_tipodoc} 
                    options = {tipoDocOptions} OnChange={handleChange} required={true}></MiLista>
                    <TextInput label="Número de Documento" name="con_nrodoc" value={formData.con_nrodoc} onChange={handleChange} placeholder="Ej: 900.123.456-7" required />
                    <TextInput label="Teléfono" name="con_telefono" type="tel" value={formData.con_telefono} onChange={handleChange} placeholder="Ej: 3001234567" required />
                    <TextInput label="Email" name="con_email" type="email" value={formData.con_email} onChange={handleChange} placeholder="ejemplo@conjunto.com" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div>
                        <label className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-1">
                            Logo del Conjunto
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">

                                 <img src={`/logo/${formData.con_logo}`} alt="Logo empresa" className="h-16 w-16 aspect-square focus:ring-4" />
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label htmlFor="con_logo" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Subir un archivo</span>
                                        <input id="con_logo" name="con_logo" type="file" className="sr-only" 
                                        onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" />
                                    </label>
                                    <p className="pl-1">o arrastrar y soltar</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                            </div>
                        </div>
                    </div>
                     {logoPreview && (
                        <div className="mt-2 text-center">
                             <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vista Previa del Logo</p>
                            <img src={logoPreview} alt="Vista previa del logo" className="mx-auto h-32 w-32 object-contain rounded-md bg-gray-100 dark:bg-slate-700 p-1 border border-gray-300 dark:border-slate-600" />
                        </div>
                    )}
    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput label="Horario de Atención" name="con_horario" value={formData.con_horario} onChange={handleChange} placeholder="Ej: L-V 8am-5pm, S 9am-12pm" />
                    <TextInput label="Consecutivo de Radicado" name="con_radicadoconsec" value={formData.con_radicadoconsec} onChange={handleChange} placeholder="Ej: 2024-001" />
                </div>
                
                <div>
                    <TextAreaInput label="Comentarios Adicionales" name="con_comentarios" value={formData.con_comentarios} onChange={handleChange} placeholder="Información relevante para la administración." />
                </div>
                
               <div className="border-t flex justify-end space-x-3">
                    <div className="mt-10">
                        <Link
                            href="/mimenu"
                            className='bg-green-500 hover:bg-green-700 text-white px-4 py-1 mx-4 rounded mb-4'
                            > Regreso
                        </Link>       
                
                        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 mx-4 rounded mb-4'>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </Card>
        </div>
    );
};

