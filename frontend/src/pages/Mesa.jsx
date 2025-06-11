import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import socket from "../libs/socket";

function Mesa({ setCodigoMesa, setNumMesa, setUsername, setCurrentPage, username, numMesa, codigoMesa }) {

    // Lista de Jugadores
    const [jugadores, setJugadores] = useState([]);
    // Chat
    const [mensajes, setMensajes] = useState([]);
    const [mensajeActual, setMensajeActual] = useState("");
    // Turnos
    const [turno, setTurno] = useState();
    const [indiceTurno, setIndiceTurno] = useState(0);

    // Jugador actual en turno
    useEffect(() => {
        if (jugadores.length > 0) {
            setTurno(jugadores[indiceTurno]);
        }
    }, [indiceTurno, jugadores]);

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

    //  Para recibir la lista de jugadores desde el servidor
    useEffect(() => {
        const handleActualizarJugadores = (jugadores) => {
            setJugadores(jugadores);
        };
        socket.on("actualizar_jugadores", handleActualizarJugadores);
        return () => {
            socket.off("actualizar_jugadores", handleActualizarJugadores);
        };
    }, []);
    useEffect(() => {
        if (numMesa) {
            socket.emit("solicitar_jugadores", numMesa);
        }
    }, [numMesa]);

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
    //contador
    const [contadorTurno, setContadorTurno] = useState(10);
    useEffect(() => {
        const handleEstadoTurno = ({ turno, contador }) => {
            setTurno(turno);
            setContadorTurno(contador);
        };
        socket.on("estado_turno", handleEstadoTurno);
        return () => {
            socket.off("estado_turno", handleEstadoTurno);
        };
    }, []);
    // Rondas y fin de la partida
    const [ronda, setRonda] = useState(1);
    const [finPartida, setFinPartida] = useState(false);
    useEffect(() => {
        const handleEstadoTurno = ({ turno, contador, ronda }) => {
            setTurno(turno);
            setContadorTurno(contador);
            setRonda(ronda);
        };
        socket.on("estado_turno", handleEstadoTurno);

        const handleFinPartida = () => {
            setFinPartida(true);
            setTimeout(() => {
                setFinPartida(false); // oculta la tabla
            }, 10000);
        };
        socket.on("fin_partida", handleFinPartida);

        return () => {
            socket.off("estado_turno", handleEstadoTurno);
            socket.off("fin_partida", handleFinPartida);
        };
    }, []);

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
                <div className="border-3 h-[605px] w-[600px] text-white p-2">
                    MESA N° {numMesa} <br />
                    CÓDIGO: {codigoMesa} <br />
                    Ronda: {ronda}/3
                    <div className=" text-white text-lg">
                        {turno ? `Turno de ${turno.username}` : "Esperando jugadores..."}
                    </div>
                    <div className=" text-white text-lg">
                        Próximo turno en {contadorTurno} segundos
                    </div>
                    {finPartida && (
                        <div className="bg-black p-6 rounded-lg shadow-xl text-center">
                            <h2 className="text-2xl font-bold mb-4">Tabla Final</h2>
                            <p>Rondas finalizadas.</p>
                            <ul>
                                {jugadores.map((j, i) => (
                                    <li key={i}>{j.username}</li>
                                ))}
                            </ul>
                            <p className="mt-4 text-sm text-gray-600">Nueva partida comenzara pronto...</p>
                        </div>
                    )}
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
                            className="flex-1 p-1 rounded-sm text-white border"
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
