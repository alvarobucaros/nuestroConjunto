import React from 'react';
import { Head,usePage, Link } from '@inertiajs/react';
import AuthenticatedLayoutDoc from '@/Layouts/AuthenticatedLayoutDoc';
import MiLink from '@/Components/MiLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function MiMenu(conjunto) {
    

    return (
        // <AuthenticatedLayoutDoc conjunto={conjunto}>
        <>
              <div className="flex items-center space-x-2 mx-6">
                <div className='grid grid-cols-9 gap-2'>
                    <MiLink Href="/comunicados" Label="Comunicados"></MiLink>
                    <MiLink Href="/misclasificados" Label="Clasificados"></MiLink>
                    <MiLink Href="/avisos" Label="Avisos"></MiLink>
                    <MiLink Href="/tramites" Label="Trámites"></MiLink>
                    <MiLink Href="/miscontactos" Label="Contáctenos"></MiLink>
                    <MiLink Href="/conjunto" Label="Parámetros"></MiLink>
                    <MiLink Href="/docs" Label="Documentación"></MiLink>                  
                    <MiLink Href="/" Label="Página"></MiLink>
                    <Link
                        method="post"
                        href={route('logout')}
                        as="button"
                    ><span className="bg-teal-100 hover:bg-teal-500 p-4 flex space-x-4 text-gray-700 font-small rounded-lg w-32 mx-auto justify-center">
                        Log Out
                    </span>
                        
                    </Link>
                </div>
                
            </div>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
             <span>
                  &copy;  desarrollo de : aortizc  - 2025  v-1.0.1  &nbsp;  &nbsp;Laravel&nbsp;+ React + Inertia + Tailwind  &nbsp; <a className='text-blue-600 dark:text-sky-400' href="https://www.aortizc.com.co/">www.aortizc.com.co </a>
            </span>
            </footer>
             </>
       // </AuthenticatedLayoutDoc>
      
    );
}