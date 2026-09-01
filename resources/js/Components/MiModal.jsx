import React from 'react';

const ModalComponent = ({ isOpen, onClose, onUpdate, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 h-5/6 rounded-lg shadow-lg overflow-auto p-6 relative">
        {/* Cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          ✖
        </button>

        {/* Contenido */}
        <div className="mb-6">{children}</div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onUpdate}
            className="bg-blue-600 text-white px-4 py-1 mx-4 rounded mb-4 hover:bg-pink-700"
          >
            Actualizar
          </button>
          <button
            onClick={onClose}
            className="bg-green-400 text-white px-4 py-1 mx-4 rounded mb-4 hover:bg-pink-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
