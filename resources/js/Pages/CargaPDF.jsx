import { useState, React } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayoutDoc from '@/Layouts/AuthenticatedLayoutDoc';
import MiDocumento from '@/Components/MiDocumento';

export default function MiMenu(props) {
    const user = usePage().props.auth.user;

        return (
            <AuthenticatedLayoutDoc
                auth={props.auth}
            >

                    <Link
                        href="/mimenu"
                        className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
                        > Regreso 
                    </Link>
                    <div className='mt-6'>
                        <span className=' bg-blue-100'> LOAD PDF </span> 
                    </div>
                    <div>
                        <label htmlFor="filepdf">Archivo pdf</label>
                        <input type="file" name="filepdf" id="filepdf" />
                    </div>
                    <div className='mt-6'>
                        <span className=' bg-blue-300'> LOAD IMAGE </span> 
                    </div>
                    <div>
                        <label htmlFor="fileimg">Imagen</label>
                        <input type="file" name="fileimg" id="fileimg" />
                    </div>                   

            </AuthenticatedLayoutDoc>
        )
    }
