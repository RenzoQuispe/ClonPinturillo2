export default function BarraHerramientasDibujo({
    onColorChange,
    onGrosorChange,
    onLimpiar,
    onSaltarTurno
}) {
    const colores = [
        "#000000", // negro
        "#808080", // gris
        "#FFFFFF", // blanco
        "#800000", // marrón oscuro
        "#FF0000", // rojo
        "#FFA500", // naranja
        "#FFFF00", // amarillo
        "#008000", // verde
        "#00FF00", // verde claro
        "#00FFFF", // cian
        "#0000FF", // azul
        "#000080", // azul oscuro
        "#800080", // púrpura
        "#FF00FF", // fucsia
        "#FFC0CB", // rosado
        "#A52A2A", // marrón
    ];

    const grosores = [3, 8, 14];

    return (
        <div className="h-12 w-100 flex items-center bg-[#cc6] rounded-br-xl shadow-lg">
            {/* botón limpiar campo de dibujo */}
            <button onClick={onLimpiar} style={{border: "2px solid #a09c34"}} className="w-10 h-10 ml-5 mr-3 bg-white flex items-center justify-center rounded-md">
                <img src="/limpiar_canva.png" alt="Limpiar" className="w-6 h-6" />
            </button>
            {/* Paleta de colores */}
            <div className="grid grid-cols-8 gap-0 w-fit">
                {colores.map((color) => (
                    <button
                        key={color}
                        className="w-5 h-5 p-0 m-0"
                        style={{ backgroundColor: color }}
                        onClick={() => onColorChange(color)}
                    />
                ))}
            </div>
            {/* Grosor */}
            <div className="ml-3 flex gap-1">
                {grosores.map((grosor) => (
                    <button
                        style={{border: "2px solid #a09c34"}}
                        key={grosor}
                        onClick={() => onGrosorChange(grosor)}
                        className="w-8 h-8 relative bg-[#eee] rounded-md"
                    >
                        <div
                            className="absolute rounded-full bg-black"
                            style={{
                                width: grosor,
                                height: grosor,
                                top: `calc(50% - ${grosor / 2}px)`,
                                left: `calc(50% - ${grosor / 2}px)`
                            }}
                        />
                    </button>
                ))}
            </div>
            {/* saltar turno */}
            <button style={{color: "#a09c34"}} onClick={onSaltarTurno} className="ml-3 w-8 h-8 bg-[#cc6] text-3xl font-bold">X</button>
        </div>
    );
}
