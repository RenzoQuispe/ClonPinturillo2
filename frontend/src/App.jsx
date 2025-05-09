
import HomePage from './pages/HomePage.jsx'
import MesaPrivada from './pages/MesaPrivada.jsx'
import CrearMesa from './pages/CrearMesa.jsx';
import UnirseMesa from './pages/UnirseMesa.jsx';

import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('player');
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setUsername={setUsername} setCurrentPage={setCurrentPage} username={username} />;
      case 'mesaprivada':
        return <MesaPrivada setUsername={setUsername} setCurrentPage={setCurrentPage} username={username} />;
      case 'crearmesa':
        return <CrearMesa setUsername={setUsername} setCurrentPage={setCurrentPage} username={username} />;
      case 'unirsemesa':
        return <UnirseMesa setUsername={setUsername} setCurrentPage={setCurrentPage} username={username} />;
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
