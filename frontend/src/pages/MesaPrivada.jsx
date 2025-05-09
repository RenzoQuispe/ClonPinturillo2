import Header from "../components/Header"
import Footer from "../components/Footer"
import CrearMesa from "./CrearMesa"
import UnirseMesa from "./UnirseMesa"

function MesaPrivada({ setUsername, setCurrentPage, username }) {
    const handleHomePage = () => {
        setUsername(username)
        setCurrentPage('home')
    }
    const handleCrearMesa = () => {
        setUsername(username)
        setCurrentPage('crearmesa')
    }
    const handleUnirseMesa = () => {
        setUsername(username)
        setCurrentPage('unirsemesa')
    }
    return (

        <div style={{ backgroundColor: '#336767', height: '100dvh' }} className="overflow-auto flex flex-col items-center">
            <Header />
            <div className="min-h-[450px] h-[515px] w-[410px] bg-cover bg-center mt-15 mb-15" style={{ backgroundImage: "url('/public/HojaLapiz.png')" }}>
                <button className="ml-10 mt-8 hover:brightness-110" onClick={handleHomePage}>
                    <img src="/atras.png" alt="Volver" className="h-[48px] w-[48px]" />
                </button>
                <div className="flex flex-col items-center space-y-15 mt-25">
                    <button
                        style={{ backgroundColor: '#69a4a4', textShadow: '0.75px 0.75px 0 #000, -0.75px -0.75px 0 #000, 0.75px -0.75px 0 #000, -0.75px 0.75px 0 #000', border: '0.75px solid black', }}
                        className="w-[225px] h-[40px] text-white font-bold text-2xl rounded-sm hover:brightness-120"
                        onClick={handleUnirseMesa}>
                        UNIRSE A MESA
                    </button>
                    <button
                        style={{ backgroundColor: '#69a4a4', textShadow: '0.75px 0.75px 0 #000, -0.75px -0.75px 0 #000, 0.75px -0.75px 0 #000, -0.75px 0.75px 0 #000', border: '0.75px solid black', }}
                        className="w-[225px] h-[40px] text-white font-bold text-2xl rounded-sm hover:brightness-120"
                        onClick={handleCrearMesa}>
                        CREAR MESA
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default MesaPrivada