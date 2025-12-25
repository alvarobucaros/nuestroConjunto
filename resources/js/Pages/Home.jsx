import { useState, React } from 'react';
import MenuLayout from '@/Layouts/MenuLayout';
import { Link} from '@inertiajs/react';
import MiLink from '@/Components/MiLink';
 
import MiTarjeta from '@/Components/MiTarjeta';
import ComunicadoCard from '@/Components/ComunicadoCard';
import CardHorizontal from '@/Components/CardHorizontal';


  export default function Home({ conjunto, avisos, comunicados, clasificados }) {
    const [showSubmenuTram, setShowSubmenuTram] = useState(false);
    const [showSubmenuComu, setShowSubmenuComu] = useState(false);

  return (
    <MenuLayout conjunto={conjunto}  id='menu'>
    <div>

    <nav className="bg-teal-100 h-5 flex space-x-6 text-gray-700 font-small rounded-lg  justify-center ">
      {/* Menú Comunicados con subniveles */}
      <div className="relative group">
        {/* <button  onClick={() => setShowSubmenuComu(!showSubmenuComu)} className="bg-teal-100  hover:bg-teal-500 flex space-x-6 text-gray-700 font-small rounded-lg  rounded-md w-36 mx-auto justify-center">Comunicados</button>
        {showSubmenuComu && (
        <div className="absolute flex flex-col bg-white shadow-lg rounded-lg  mt-2 z-10">
          <MiLink Href="/comunicados/A" Label="A la comunidad"></MiLink> 
          <MiLink Href="/comunicados/N" Label="Normatividad"></MiLink> 
          <MiLink Href="/comunicados/C" Label="Contratación"></MiLink> 
          <MiLink Href="/comunicados/T" Label="Ver Todos"></MiLink> 
        </div>
        )} */}
       </div>

      <div className="bg-teal-100  hover:bg-teal-500 flex space-x-6 text-gray-700 font-small rounded-md w-36 mx-auto justify-center" >
        <Link href="#comunicados" >Comunicados</Link>  
      </div>

      <div className="bg-teal-100  hover:bg-teal-500 flex space-x-6 text-gray-700 font-small rounded-md w-36 mx-auto justify-center" >
        <Link href="#clasificados" >Avisos</Link>  
      </div>
            <div className="bg-teal-100  hover:bg-teal-500 flex space-x-6 text-gray-700 font-small rounded-md w-36 mx-auto justify-center" >
        <Link href="/clasificados" >Clasificados</Link>  
      </div>
      {/* Menú Trámites con subniveles */}
      <div className="relative group">
        <button  onClick={() => setShowSubmenuTram(!showSubmenuTram)} className="bg-teal-100  hover:bg-teal-500 flex space-x-6 text-gray-700 font-small rounded-lg  rounded-md w-36 mx-auto justify-center">Trámites</button>
        {showSubmenuTram && (
        <div className="absolute flex flex-col bg-white shadow-lg rounded-lg  mt-2 z-10">
          <MiLink Href="/tramites/S" Label="Parqueadero"></MiLink> 
          <MiLink Href="/tramites/P" Label="Paz y Salvo"></MiLink> 
          <MiLink Href="/tramites/T" Label="Trasteos"></MiLink> 
          <MiLink Href="/tramites/A" Label="Alquiler salones"></MiLink> 
       </div>
        )}
      </div>
      <div className="bg-teal-100  hover:bg-teal-500 flex space-x-6 text-gray-700 font-small rounded-md w-36 mx-auto justify-center" >
          <Link href="/contactos" >Contáctenos</Link>  
      </div>         
    </nav>


        <main className="p-6 space-y-8">
          <section id='avisos'>
            <h2 className="text-xl font-bold text-gray-800">📰 Avisos Generales</h2>
                <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {avisos.data.map((aviso) => (
                    <MiTarjeta key={aviso.id} aviso={aviso} />
                  ))}
                </div>
              </div> 
          </section>

          <section id='comunicados'>
 
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800">📢 Comunicados Varios</h2>
                <Link href="#menu" className="text-blue-600 hover:underline">⬆️ Al menú</Link>
              </div>
              <div className="p-6">
                {comunicados.data.map((comunicado) => (
                   <ComunicadoCard key={comunicado.id} comunicado={comunicado} />
                ))}
              </div>
          </section>

          <section id='clasificados'>  
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800">🧱 Avisos Clasificados</h2>
                <Link href="#menu" className="text-blue-600 hover:underline">⬆️ Al menú</Link>
              </div>
 
              <div className="p-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {clasificados.data.map((clasificado) => (
               
                  <CardHorizontal key={clasificado.id} clasificado={clasificado} />
              
                  
                ))}
                  </div>
              </div> 
          </section>
        </main>
    </div>
    </MenuLayout>
  );
}