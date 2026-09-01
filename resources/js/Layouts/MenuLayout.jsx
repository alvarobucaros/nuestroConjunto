// resources/js/Layouts/MenuLayout.jsx 
import { useState, React } from 'react';
 
export default function MenuLayout({ conjunto, children }) {
  // Clase base para ítems del menú principal


const [showSubmenuTram, setShowSubmenuTram] = useState(false);
const [showSubmenuComu, setShowSubmenuComu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <img src={`/logo/${conjunto.con_logo}`} alt="Logo empresa" className="h-10 w-16 aspect-square focus:ring-4" />
        <span  className="text-xm font-semibold text-teal-800">BIENVENIDO A </span>
        <h1  className="text-xm font-semibold text-teal-500">{conjunto.con_nombre}</h1>
      </div>
    </header>


      {/* Menu */}
 
      {/* Content */}
      <main className="p-6">
        {children}
      </main>

      <footer className="w-full bg-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-gray-300 p-6 shadow rounded w-full max-w-md">
              <div className="text-gray-800 text-center font-thin text-xs space-y-2">
                <span className="block font-semibold">{conjunto.con_nombre}</span>
                <p>Dirección: {conjunto.con_direccion} - {conjunto.con_ciudad}</p>
                <p>Email: {conjunto.con_email}</p>
                <p>Identificación: {conjunto.con_tipodoc} - {conjunto.con_nrodoc} Tel: {conjunto.con_telefono}</p>
                <p>HORARIO DE ATENCIÓN:</p>
                <p>{conjunto.con_horario}</p>
                <a href="https://aortizc.com.co/" className="block mt-4 text-green-700 hover:underline">
                  &copy; desarrollo de: aortizc - 2025 2026 &nbsp;&nbsp;&nbsp; V 1.2.1
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}