import React, { useState } from 'react';

// MiRadioButton.jsx
// Componente de botón de radio personalizado
// Props:
// - estados: objeto con las opciones de estado (clave: valor)
// - selected: valor seleccionado actualmente
// - OnChange: función para manejar el cambio de selección
// - Name: nombre del grupo de botones de radio
// - Label: etiqueta para el grupo de botones de radio

export default function MiRadioButton({ estados, selected, OnChange, Name, Label}) {

    return (
        <div>
            <label  className="block text-sm font-medium text-gray-700">{Label} </label>
            <div className="flex space-x-6">
                {Object.entries(estados).map(([key, label]) => (
                    <div key={key} className="flex items-center">
                        <input
                            type="radio"
                            id={`option${key}`}
                            name={Name}
                            value={key}
                            checked={selected === key}
                            onChange={OnChange} 
                            className="peer appearance-none h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all duration-200"
                        />
                        <label htmlFor={`option${key}`} className="ml-2 text-gray-700 cursor-pointer">
                            {label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
