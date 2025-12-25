export default function CardHorizontal({ clasificado }) {

 
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col h-full">
      <img
        src={`/images/${clasificado.cla_grafica}`}
        alt={clasificado.cla_titulo}
        className="w-full max-w-md h-auto rounded-md mb-4"
      />
      <h2 className="text-xl font-bold text-gray-900">{clasificado.cla_titulo}</h2>
      <p className="text-gray-700 text-base mb-4">{clasificado.cla_detalle}</p>
      <div className="text-sm text-gray-600 mt-auto">
        <p>{clasificado.cla_nombre} {clasificado.cla_apellido}</p>
        <p>Tel: {clasificado.cla_telefonos}</p>
        <p>Publicado el: {clasificado.cla_fchPublicacion}</p>
      </div>
    </div>
  );

}