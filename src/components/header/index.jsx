import { Link } from 'react-router-dom'
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6"
import logo from '@/assets/logo.png'
import NavBar from '../navbar'

function Header() {
    return (
        <header className="w-full flex justify-between bg-white p-5 md:px-8 md:py-5 shadow-md">
            <Link to="/">
              <img className="w-40" src={ logo } alt="Logo" />
            </Link>
            <NavBar />
            <div className="flex items-center gap-3 py-0.5">
              <Link to="mailto:everaldoinfortecnico@gmail.com" target="_blank" className="text-blue-500 hover:text-blue-700">
                <FaEnvelope className="text-2xl" />
              </Link>
              <Link to="https://www.instagram.com/dev_emartins" target="_blank" className="text-blue-500 hover:text-blue-700">
                <FaInstagram className="text-2xl" />
              </Link>
              <Link to="https://www.linkedin.com/in/everaldomartins" target="_blank" className="text-blue-500 hover:text-blue-700">
                <FaLinkedin className="text-2xl" />
              </Link>
              <Link to="https://github.com/dev-emartins" target="_blank" className="text-blue-500 hover:text-blue-700">
                <FaGithub className="text-2xl" />
              </Link>
            </div>
        </header>
    )
}

export default Header