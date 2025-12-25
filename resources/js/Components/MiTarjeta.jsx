export default function MiTarjeta({ aviso }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
    {/* Título y subtítulo */}
      <h2 className="text-base text-bold text-center font-bold text-gray-800">{aviso.avi_titulo}</h2>
      <h3 className="text-sm text-gray-600 mb-1">{aviso.avi_subtitulo}</h3>
      {/* Imagen si existe */}
      {aviso.avi_grafica && (
        <img
          src={`/images/${aviso.avi_grafica}`}
          alt={aviso.avi_titulo}
          className="w-full max-w-md h-auto rounded-md mb-4"
        />
      )}
      {/* Detalle */}
      <p className="text-gray-700 text-sm">{aviso.avi_detalle}</p>
    </div>
  );
}
