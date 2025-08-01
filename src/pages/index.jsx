import { Outlet } from "react-router-dom"
import logo from '@/assets/logo.png'

function App(){
  return (
    <>
      <header className="bg-white p-5 rounded-lg shadow-md mb-5">
        <img className="w-36" src={ logo } alt="Logo" />
      </header>
      <Outlet />
    </>
  )
}

export default App