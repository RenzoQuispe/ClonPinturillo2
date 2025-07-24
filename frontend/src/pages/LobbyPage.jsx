import Header from "../components/Header"
import Footer from "../components/Footer"

function LobbyPage({ setCodigoMesa, setNumMesa, setUsername, setCurrentPage, username, numMesa, codigoMesa }) {
    const handleHomePage = () => {
        setUsername(username)
        setCurrentPage('home')
    }
    return (
        <div style={{ backgroundColor: '#336767', height: '100dvh' }} className="overflow-auto flex flex-col items-center">
            {/*encabezado */}
            <Header idioma="es" setCurrentPage={setCurrentPage} setUsername={setUsername} username={username} />

            {/*Contenido */}
            <div className="min-h-[450px] h-[515px] w-[410px] bg-cover bg-center mt-15 mb-15">
                {/* lista de salas */}
                {/* chat general */}
            </div>
            {/*pie de pagina */}
            <Footer />
        </div>
    )
}
export default LobbyPage;