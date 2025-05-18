import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useRef, useEffect } from "react";

import socket from "../lib/socket";

function CrearMesa({ setNumMesa, setCodigoMesa, setUsername, setCurrentPage, username }) {
    const inputRefCodigoMesa = useRef(null);
    // Atras
    const handleMesaPrivada = () => {
        setUsername(username);
        setCurrentPage('mesaprivada');
        setCodigoMesa("");
        setNumMesa("");
    };
    // Para boton crear Mesa
    const handleCrear = () => {
        const codigo = inputRefCodigoMesa.current.value.trim();
        if (!codigo) return;

        socket.emit("crear_sala", { username, roomCode: codigo });
    };

    useEffect(() => {
        socket.on('sala_creada', ({ mesaId, roomCode }) => {
            setNumMesa(mesaId);
            setCodigoMesa(roomCode);
            setUsername(username);

            // Cambiar a página mesa, donde está el listener
            setCurrentPage('mesa');
        });

        return () => {
            socket.off('sala_creada');
        };
    }, []);

    /*
    useEffect(() => {
        socket.on('sala_creada', ({ mesaId, roomCode }) => {
            setNumMesa(mesaId);
            setCodigoMesa(roomCode);
            setUsername(username);

            setCurrentPage('mesa');  // Cambiar de página aquí

            // Luego unirse a la sala para recibir eventos posteriores
            socket.emit('unirse_sala', { username, numMesa: mesaId, codigoMesa: roomCode }, (response) => {
                if (!response.success) {
                    console.error("Error al unirse justo después de crear:", response.message);
                }
            });
        });

        return () => {
            socket.off('sala_creada');
        };
    }, []);

    */
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
