import { useState, React } from 'react';
import MenuLayout from '@/Layouts/MenuLayout';
import {Head,  Link} from '@inertiajs/react';
import CardHorizontal from '@/Components/CardHorizontal';

import ComunicadoCard from '@/Components/ComunicadoCard';


  export default function Home({ conjunto, clasificados }) {

    return (
        <MenuLayout conjunto={conjunto}  id='menu'>
          <Head title="Clasificados - Propiedad Horizontal" />
            <div>
            
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-xl font-bold text-blue-800">🧱 AVISOS CLASIFICADOS</h2>
                <span className="font-bold text-blue-600">Últimos avisos clasificados publicados por la comunidad.</span>
                <Link href="/" className="text-blue-600 hover:underline">⬆️ Al menú</Link>
              </div>
 
              <div className="p-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {clasificados.data.map((clasificado) => (
               
                    <CardHorizontal key={clasificado.id} clasificado={clasificado} />
              
                  
                    ))}
                  </div>
              </div>  

            </div>
        </MenuLayout>
    );
    }