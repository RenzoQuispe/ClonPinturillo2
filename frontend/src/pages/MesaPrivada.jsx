import Header from "../components/Header"
import Footer from "../components/Footer"

function MesaPrivada({setCurrentPage, username}) {
    return (

        <div style={{ backgroundColor: '#336767' }} className="min-h-screen flex flex-col items-center">
            <Header />
            <h1 className="text-white text-xl ml-2">HOLA {username}</h1>
            <Footer />
        </div>
    )
}
export default MesaPrivada