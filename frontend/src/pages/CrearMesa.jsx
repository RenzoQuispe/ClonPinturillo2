import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useRef, useEffect, useState } from "react";
import crearSala from "../lib/crearSala";
import socket from "../lib/socket";

function CrearMesa({ setUsername, setCurrentPage, setNumMesa, setCodigoMesa, username, numMesa }) {


    const [errorMessage, setErrorMessage] = useState("");
    const inputRefCodigoMesa = useRef(null);

    const [mesaId, setMesaId] = useState(null);
    const [roomCode, setRoomCode] = useState('');

    // Atras(Regreso a MesaPrivada.jsx)
    const handleMesaPrivada = () => {
        setUsername(username);
        setCurrentPage('mesaprivada');
        setCodigoMesa("");
        setNumMesa("");
    };

    // Para boton crear Mesa
    const handleCrear = async() => {
        //Crea la sala
        const codigo = inputRefCodigoMesa.current.value.trim();
        if (!codigo) return;
        const { mesaId, roomCode} = await crearSala(username, codigo); //socket.emit("crear_sala", { username, roomCode: codigo });
        // El creador de la sala se une a la sala que creo
        socket.emit("unirse_sala", { username, numMesa: mesaId, codigoMesa: roomCode }, (response) => {
            if (!response || !response.success) {
                setErrorMessage(response?.message || "Error al unirse a la sala.");
            } else {
                setNumMesa(mesaId);
                setCodigoMesa(roomCode);
                setCurrentPage("mesa");
                setErrorMessage("");
            }
        });
    };

    return (
        <div style={{ backgroundColor: '#336767', height: '100dvh' }} className="overflow-auto flex flex-col items-center">
            <Header />
            <div className="min-h-[450px] h-[515px] w-[410px] bg-cover bg-center mt-15 mb-15" style={{ backgroundImage: "url('/public/HojaLapiz.png')" }}>
                <button className="ml-10 mt-8 hover:brightness-110" onClick={handleMesaPrivada}>
                    <img src="/atras.png" alt="Volver" className="h-[48px] w-[48px]" />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="w-[325px] text-3xl font-bold ml-10">Crea una mesa para jugar con tus amigos</h1>
                    <div className="w-[225px] mt-5">
                        <h1 className="text-3xl font-bold">CÓDIGO:</h1>
                        <input
                            ref={inputRefCodigoMesa}
                            spellCheck={false}
                            style={{ backgroundColor: '#bfc2c4' }}
                            className="text-2xl py-1 px-4 border border-gray-400 rounded-sm w-[225px] mt-1"
                        />
                        <button
                            style={{
                                backgroundColor: '#69a4a4',
                                textShadow: '0.75px 0.75px 0 #000, -0.75px -0.75px 0 #000, 0.75px -0.75px 0 #000, -0.75px 0.75px 0 #000',
                                border: '0.75px solid black',
                            }}
                            className="w-[225px] h-[40px] text-white font-bold text-2xl rounded-sm hover:brightness-120 mt-5"
                            onClick={handleCrear}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CrearMesa;
