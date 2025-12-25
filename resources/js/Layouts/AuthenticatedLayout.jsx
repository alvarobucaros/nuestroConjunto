
import React from 'react';


export default function AuthenticatedLayout({ conjunto, children }) {

  const tipoDocOptions = {
      C: 'C. C.',
      E: 'C. E.',
      N: 'Nit',
      P: 'Pasaporte'
  };


return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
            <img src={`/logo/${conjunto.con_logo}`} alt="Logo empresa" className="h-8 w-12 aspect-square focus:ring-4 " />         
            <h1 className="text-xm font-semibold text-teal-500">{conjunto.con_nombre}</h1>

        </div>
      </header>

      {/* Menu */}
 
      {/* Content */}
      <main className="p-6">
        {children}
      </main>





      <footer className="w-full bg-gray-100 py-6">
        <div className="mx-auto max-w-4xl px-2 sm:px-4 lg:px-6">            
          <div className="  flex justify-center  grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-2 max-sm:max-w-sm max-sm:mx-auto gap-y-8"> 
                        
                  <div className="mx-auto w-max bg-gray-300 p-6 shadow rounded columns-2"> 
                    <div className="text-gray-800 text-center font-thin text-xs space-y-2"> 
                          <span className=" mb-4">{conjunto.con_nombre}</span>
                          <p>Dirección: {conjunto.con_direccion} - {conjunto.con_ciudad}</p>
                          <p>Email: {conjunto.con_email} </p>
                          <p>Dcmnto: {tipoDocOptions[conjunto.con_tipodoc] || 'Desconocido'} - {conjunto.con_nrodoc} Tel:{conjunto.con_telefono}</p>
                         
                          <p>HORARIO DE ATENCION: </p>
                          <p>{conjunto.con_horario}</p>
                           <p></p>
                          <a href="https://aortizc.com.co/"  > &copy;  Desarrollo de : aortizc  - 2025  V-1.0.2 </a>
                    </div>
                  
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}