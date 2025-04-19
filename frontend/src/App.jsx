import Navbar from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import { Route, Routes, Router } from "react-router"
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='min-w-[768px] overflow-x-auto'>
      <div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/lobby' element={<div>LOBBY</div>}/>
        </Routes>
        <Toaster />
      </div>
    </div>
  )
}
export default App
