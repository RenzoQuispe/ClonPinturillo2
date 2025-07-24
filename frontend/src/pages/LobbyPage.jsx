import Header from "../components/Header"
import Footer from "../components/Footer"
import { Send } from "lucide-react";

function LobbyPage({ setCodigoMesa, setNumMesa, setUsername, setCurrentPage, username, numMesa, codigoMesa }) {
    return (
        <div style={{ backgroundColor: '#336767', height: '100dvh' }} className="overflow-auto flex flex-col items-center">
            {/*encabezado */}
            <Header idioma="es" setCurrentPage={setCurrentPage} setUsername={setUsername} username={username} />
            {/*Contenido */}
            <div className="flex justify-between space-x-5 mt-3 mb-3">
                {/* lista de salas */}
                <div style={{ border: "5px solid #a09c34" }} className="bg-gray-200 rounded-3xl h-[600px] w-[750px] text-black p-2 flex flex-col justify-between">
                    <div className="overflow-y-auto flex-1 text-black">
                        <div style={{ background: "#c8c454" }} className="rounded-tl-2xl rounded-tr-2xl h-[30px] w-[720px] text-white text-2xl font-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mesas: 80 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Usuarios: 712</div>
                        <ul className="space-y-1 text-black">
                            
                        </ul>
                    </div>
                </div>
                {/* chat general */}
                <div style={{ border: "5px solid #a09c34" }} className="bg-gray-200 rounded-3xl h-[600px] w-[400px] text-black p-2 flex flex-col justify-between">
                    <div className="overflow-y-auto flex-1 text-black">
                        <ul className="space-y-1 text-black">
                            
                        </ul>
                    </div>
                    <div className="mt-2 flex">
                        <input
                            className="flex-1 p-1 ml-1 rounded-sm text-black border bg-gray-300"
                        />
                        <button
                            style={{ background: "#336767" }}
                            className="ml-2 px-2 w-[38px] text-white font-bold rounded-sm hover:brightness-110"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
            {/*pie de pagina */}
            <Footer />
        </div>
    )
}
export default LobbyPage;