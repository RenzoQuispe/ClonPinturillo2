
import HomePage from './pages/HomePage.jsx'
import MesaPrivada from './pages/MesaPrivada.jsx'
import CrearMesa from './pages/CrearMesa.jsx';
import UnirseMesa from './pages/UnirseMesa.jsx';
import Mesa from './pages/Mesa.jsx';
import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('player');
  const [numMesa, setNumMesa] = useState('');
  const [codigoMesa, setCodigoMesa] = useState('');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setUsername={setUsername} setCurrentPage={setCurrentPage} username={username} />;
      case 'mesaprivada':
        return <MesaPrivada setUsername={setUsername} setCurrentPage={setCurrentPage} username={username} />;
      case 'crearmesa':
        return <CrearMesa setNumMesa={setNumMesa} setCodigoMesa={setCodigoMesa} setUsername={setUsername} setCurrentPage={setCurrentPage} username={username} codigoMesa={codigoMesa} />;
      case 'unirsemesa':
        return <UnirseMesa setUsername={setUsername} setCurrentPage={setCurrentPage} setNumMesa={setNumMesa} setCodigoMesa={setCodigoMesa} username={username} />;
      case 'mesa':
        return <Mesa setNumMesa={setNumMesa} setCodigoMesa={setCodigoMesa} setUsername={setUsername} setCurrentPage={setCurrentPage} username={username} numMesa={numMesa} codigoMesa={codigoMesa} />;
      default:
        return <HomePage setUsername={setUsername} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className='min-w-[768px] overflow-x-auto'>
      {renderPage()}
    </div>
  )
}
export default App
