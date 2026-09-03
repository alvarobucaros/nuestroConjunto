import { useState, React } from 'react';
import MenuLayout from '@/Layouts/MenuLayout';
import {Head, Link} from '@inertiajs/react';

import ComunicadoCard from '@/Components/ComunicadoCard';


  export default function Home({ conjunto, avisos, comunicados, clasificados }) {

    return (
        <MenuLayout conjunto={conjunto}  id='menu'>
           <Head title="Comunicados - Propiedad Horizontal" />
            <div>

              <div className="flex flex-row items-center gap-4">
                <h2 className="text-xl font-bold text-blue-800">📢 COMUNICADOS</h2>
                <span className="font-bold text-blue-600">Últimos comunicados de la administración y del consejo de administración.</span>
                <Link href="/" className="text-blue-600 hover:underline">⬆️ Al menú</Link>
              </div>
              <div className="p-6">
                {comunicados.data.map((comunicado) => (
                   <ComunicadoCard key={comunicado.id} comunicado={comunicado} />
                ))}
              </div>

            </div>
        </MenuLayout>
    );
    }