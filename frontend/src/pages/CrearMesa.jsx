import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useRef, useEffect, useState } from "react";
import socket from "../libs/socket";

function CrearMesa({ setUsername, setCurrentPage, setNumMesa, setCodigoMesa, username, numMesa }) {

    const inputRefCodigoMesa = useRef(null);

    const [errorMessage, setErrorMessage] = useState("");
    // Cuando errorMessage cambia, iniciar temporizador para borrarlo
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(""); // Limpia el mensaje después de 3s
            }, 3000);

            return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta o se actualiza antes
        }
    }, [errorMessage]);

    // Atras(Regreso a MesaPrivada.jsx)
    const handleMesaPrivada = () => {
        setUsername(username);
        setCurrentPage('mesaprivada');
        setCodigoMesa("");
        setNumMesa("");
    };

    // Para boton crear Mesa
    const handleCrear = () => {
        //Crea la sala
        const codigo = inputRefCodigoMesa.current.value.trim();
        if (!codigo) {
            setErrorMessage("Ingresar una contraseña")
            return;
        }
        socket.emit("crear_sala", { username, roomCode: codigo });

        socket.once("sala_creada", ({ mesaId, roomCode }) => {
            console.log("hecho :D")
            setNumMesa(mesaId);
            setCodigoMesa(roomCode);
            setCurrentPage("mesa");
            setErrorMessage("");
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
                        {errorMessage && (
                            <div className="mt-3 text-red-600 text-xl">{errorMessage}</div>
                        )}
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
