import Header from "../components/Header"
import Footer from "../components/Footer"
import { useRef } from "react";

function HomePage({ setUsername, setCurrentPage, username }) {
    const inputRefUsername = useRef(null); // referencia al input

    const handleMesaPrivada = () => {
        const username = inputRefUsername.current.value.trim();
        if (username) {
            setUsername(username);
            setCurrentPage('mesaprivada');
        }
    };
    return (

        <div style={{ backgroundColor: '#336767', height: '100dvh' }} className="overflow-auto flex flex-col items-center">
            <Header />
            <div className="relative flex justify-center min-h-[300px] h-[540px] w-[660px] mt-5 mb-20 ">
                <img src='/pinturillo2_tipo1.png' className="absolute h-[400px] w-[500px]" />
                <div
                    className="absolute bottom-0 left-0 h-[235px] w-[650px] rounded-2xl flex flex-col justify-between p-4"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    <div>
                        <h1 className="text-white text-xl ml-2">Nombre del Jugador</h1>
                        <input
                            ref={inputRefUsername}
                            defaultValue={username?.trim() ? username : "Player"}
                            spellCheck={false}
                            className="text-2xl py-2 px-4 border border-white mt-3 rounded-xl w-[600px] ml-2
             bg-white/20 backdrop-blur-md placeholder-white text-white"
                        />
                        <button
                            className="text-2xl py-2 font-bold bg-yellow-400 rounded-xl w-[600px] mt-3 ml-2 hover:brightness-150 cursor-pointer"

                        >
                            !A JUGAR¡
                        </button>
                    </div>
                    <div className="justify-between mt-3 ml-2">
                        <button
                            className="w-[290px] py-1 text-2xl text-yellow-400 border rounded-xl hover:brightness-150 cursor-pointer"

                        >
                            LOBBY
                        </button>
                        <button
                            className="w-[290px] py-1 text-2xl text-yellow-400 border rounded-xl ml-5 hover:brightness-150 cursor-pointer"
                            onClick={handleMesaPrivada}
                        >
                            MESA PRIVADA
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>  
    )
}
export default HomePage