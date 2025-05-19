import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import socket from "../lib/socket";

function Mesa({ setCodigoMesa, setNumMesa, setUsername, setCurrentPage, username, numMesa, codigoMesa }) {

    useEffect(() => {
        if (numMesa) {
            socket.emit("solicitar_jugadores", numMesa);
            console.log("hecho :D solicitar_jugadores");
        }else{
            console.log("error");
        }
    }, [numMesa]);
    
    useEffect(() => {
        console.log("Socket conectado con id:", socket.id);
        console.log("numMesa:", numMesa);
        console.log("codigoMesa:", codigoMesa);
    }, []);
    useEffect(() => {
        if (!socket.connected) {
            console.log("hecho");
            socket.connect(); // asegurarse de que está conectado
        }
    }, []);

    // Lista de Jugadores
    const [jugadores, setJugadores] = useState([]);
    // Chat
    const [mensajes, setMensajes] = useState([]);
    const [mensajeActual, setMensajeActual] = useState("");


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
            console.log("hecho");
            socket.emit("verificar_sala", numMesa);
        }else{
            console.log("error");
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

    //  Para recibir la lista de jugadores desde el servidor
    useEffect(() => {
        const handleActualizarJugadores = (jugadores) => {
            console.log("✅ [Mesa] actualizar_jugadores:", jugadores);
            setJugadores(jugadores);
            console.log("Jugadores: ", jugadores)
        };

        socket.on("actualizar_jugadores", handleActualizarJugadores);

        return () => {
            socket.off("actualizar_jugadores", handleActualizarJugadores);
        };
    }, []);



    // para recibir mensajes desde el servidor
    useEffect(() => {
        socket.on("nuevo_mensaje", (mensaje) => {
            setMensajes(prev => [...prev, mensaje]);
        });

        return () => {
            socket.off("nuevo_mensaje");
        };
    }, []);
    const enviarMensaje = () => {
        if (mensajeActual.trim() !== "") {
            const nuevoMensaje = { username, texto: mensajeActual };
            socket.emit("enviar_mensaje", { numMesa, mensaje: nuevoMensaje });
            setMensajeActual(""); // limpiar campo
        }
    };


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
                <div className="border-3 h-[605px] w-[400px] text-white p-2 flex flex-col justify-between">
                    <div className="overflow-y-auto flex-1">
                        <h2 className="text-xl font-bold mb-2">CHAT</h2>
                        <ul className="space-y-1">
                            {mensajes.map((msg, idx) => (
                                <li key={idx} className="text-white text-sm">
                                    <span className="font-bold">{msg.username}: </span>{msg.texto}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-2 flex">
                        <input
                            value={mensajeActual}
                            onChange={(e) => setMensajeActual(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
                            placeholder="Escribe un mensaje..."
                            className="flex-1 p-1 rounded-sm text-white"
                        />
                        <button
                            onClick={enviarMensaje}
                            className="ml-2 px-3 bg-teal-600 text-white font-bold rounded-sm hover:brightness-110"
                        >
                            Enviar
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Mesa;
