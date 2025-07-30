export default function BarraHerramientasDibujo({
    onColorChange,
    onGrosorChange,
    onLimpiar,
    onSaltarTurno
}) {
    const colores = [
        "#ffffff", "#ff0000", "#ffff00", "#00ff00", "#00ffff",
        "#0000ff", "#ff00ff", "#808080", "#000000"
    ];
    const grosores = [3, 8, 12];

    return (
        <div className="h-14 w-100 flex items-center bg-[#cc6] rounded-br-xl shadow-lg">
            {/* botón limpiar campo de dibujo */}
            <button onClick={onLimpiar} className="w-8 h-8 ml-5 mr-3 bg-white border border-black flex items-center justify-center">
                <img src="/fondo_campo_dibujo.png" alt="Limpiar" className="w-6 h-6" />
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
                        key={grosor}
                        onClick={() => onGrosorChange(grosor)}
                        className="w-8 h-8 relative border border-black bg-[#eee]"
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
            <button onClick={onSaltarTurno} className="ml-3 w-8 h-8 bg-[#cc6] text-xl font-bold">X</button>
        </div>
    );
}
