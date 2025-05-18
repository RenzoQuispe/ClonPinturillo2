import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import socket from "../lib/socket";

function Mesa({ setCodigoMesa, setNumMesa, setUsername, setCurrentPage, username, numMesa, codigoMesa }) {
    const [jugadores, setJugadores] = useState([]);

    // Regresar al menú principal
    const handleMenu = () => {
        setUsername("");
        setCodigoMesa("");
        setNumMesa("");
        setCurrentPage("home");
    };

    // Verifica si la sala existe (al entrar o reconectar)
    useEffect(() => {
        if (numMesa) {
            socket.emit("verificar_sala", numMesa);
        }

        const handleReconnect = () => {
            if (numMesa) {
                socket.emit("verificar_sala", numMesa);
            }
        };

        socket.on("connect", handleReconnect);

        return () => {
            socket.off("connect", handleReconnect);
        };
    }, [numMesa]);

    // Maneja si la sala fue eliminada (respuesta del servidor)
    useEffect(() => {
        const handleSalaEliminada = () => {
            alert("La sala ha sido eliminada o ya no está disponible.");
            handleMenu();
        };

        socket.on("sala_eliminada", handleSalaEliminada);
        return () => {
            socket.off("sala_eliminada", handleSalaEliminada);
        };
    }, []);


    /*
        useEffect(() => {
        socket.on('actualizar_jugadores', (jugadores) => {
            setJugadores(jugadores);
        });

        // Emitir unirse_sala para registrar al jugador en la sala
        if (numMesa && codigoMesa && username) {
            socket.emit('unirse_sala', { username, numMesa, codigoMesa }, (response) => {
                if (!response.success) {
                    console.error("Error al unirse:", response.message);
                } else {
                    // Solicitar la lista para sincronizar
                    socket.emit('solicitar_jugadores', numMesa);
                }
            });
        }

        return () => {
            socket.off('actualizar_jugadores');
        };
    }, [numMesa, codigoMesa, username]);
    */

    return (
        <div style={{ backgroundColor: '#336767', height: '100dvh' }} className="overflow-auto flex flex-col items-center">
            <Header />
            <div className="flex justify-between space-x-5 mt-3 mb-3">
                {/* Tabla de jugadores */}
                <div className="border-3 h-[605px] w-[200px] text-white p-2 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-2">JUGADORES:</h2>
                    <ul>
                        {jugadores.length > 0 ? (
                            jugadores.map((jugador) => (
                                <li key={jugador.id} className="text-lg">
                                    {jugador.username}
                                </li>
                            ))
                        ) : (
                            <li className="text-lg">No hay jugadores en esta sala.</li>
                        )}
                    </ul>
                </div>

                {/* Campo de Dibujo */}
                <div className="border-3 h-[605px] w-[600px] text-white p-2 font-bold">
                    MESA N° {numMesa} <br />
                    CÓDIGO: {codigoMesa}
                </div>

                {/* Chat */}
                <div className="border-3 h-[605px] w-[400px] text-white p-2 font-bold">Campo de chat</div>
            </div>
            <Footer />
        </div>
    );
}

export default Mesa;
