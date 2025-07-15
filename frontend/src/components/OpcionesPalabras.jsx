function OpcionesPalabras({ opciones, onEscoger }) {
  return (
    <div className="text-2xl">
      <div className="flex">
        {opciones.map((palabra, idx) => (
          <button
            key={idx}
            onClick={() => onEscoger(palabra)}
            className="px-3 py-2 hover:brightness-110 w-[200px] bg-gray-200"
            style={{ border: "2px solid #a09c34" }}
          >
            {palabra}
          </button>
        ))}
      </div>
    </div>
  );
}
export default OpcionesPalabras;
