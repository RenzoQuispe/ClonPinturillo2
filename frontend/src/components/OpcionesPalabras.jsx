function OpcionesPalabras({ opciones, onEscoger }) {
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-md">
      <h3 className="text-lg mb-2">Escoge una palabra:</h3>
      <div className="flex space-x-3">
        {opciones.map((palabra, idx) => (
          <button
            key={idx}
            onClick={() => onEscoger(palabra)}
            className="bg-teal-500 px-3 py-2 rounded hover:brightness-110"
          >
            {palabra}
          </button>
        ))}
      </div>
    </div>
  );
}
export default OpcionesPalabras;
