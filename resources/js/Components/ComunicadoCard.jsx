export default function ComunicadoCard({ comunicado }) {
  // Traducir el tipo
  const tipoTexto = {
    O: 'A la Comunidad',
    N: 'Normatividad',
    C: 'Contratación',
  }[comunicado.com_tipo] || 'Otro';

  const tipoEstado = {
    A: 'Activo',
    I: 'Inactivo',
  }[comunicado.com_estado] || 'Suspendido';

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden mb-4">
      {/* 1. Gráfica */}
      <div className="md:w-1/6 w-full h-48 md:h-auto inset-x">
        {comunicado.com_grafica ? (
          <img
            src={`/images/${comunicado.com_grafica}`}
            alt={comunicado.com_titulo}
            className="w-full max-w-md h-auto rounded-md mb-4"
            //  style={{ width: '60px', height: '60px' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}
      </div>

      {/* 2. Tipo y título */}
      <div className="md:w-1/6 p-4 border-t md:border-t-0 md:border-l border-gray-200">
        <p className="text-sm text-gray-500 font-semibold">{tipoTexto}</p>
        <h2 className="text-lg font-bold text-gray-800">{comunicado.com_titulo}</h2>
      </div>

      {/* 3. Detalle */}
      <div className="md:w-1/8 p-4 border-t md:border-t-0 md:border-l border-gray-200">
        <p className="text-gray-700">{comunicado.com_detalle}</p>
      </div>

      {/* 4. Anexo y fecha */}
      <div className="md:w-1/6 p-4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-between">
        {comunicado.com_anexo ? (
          <a
            href={`/anexos/${comunicado.com_anexo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mb-2"
          >Ver doc. en PDF
          </a>
        ) : (
          <p className="text-gray-500 mb-2">Sin anexo</p>
        )}
        <p className="text-sm text-gray-500">
          🗓 Publicado: {new Date(comunicado.com_fechaPublicacion).toLocaleDateString()}
          <strong className="mx-4 text-sm text-gray-500 font-semibold"> {tipoEstado}</strong>
        </p>
      </div>
    </div>
  );
}
