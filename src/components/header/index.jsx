import { Link } from 'react-router-dom'
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6"
import logo from '@/assets/logo.png'

function Header() {
    return (
        <header className="w-full flex justify-between bg-white p-5 shadow-md">
            <img className="w-36" src={ logo } alt="Logo" />
            <div className="flex gap-4 py-1">
              <Link to="mailto:everaldoinfortecnico@gmail.com" target="_blank" className="text-blue-500 hover:text-blue-700">
                <FaEnvelope className="text-3xl" />
              </Link>
              <Link to="https://www.instagram.com/dev_emartins" target="_blank" className="text-blue-500 hover:text-blue-700">
                <FaInstagram className="text-3xl" />
              </Link>
              <Link to="https://www.linkedin.com/in/everaldomartins" target="_blank" className="text-blue-500 hover:text-blue-700">
                <FaLinkedin className="text-3xl" />
              </Link>
              <Link to="https://github.com/dev-emartins" target="_blank" className="text-blue-500 hover:text-blue-700">
                <FaGithub className="text-3xl" />
              </Link>
            </div>
        </header>
    )
}

export default Header