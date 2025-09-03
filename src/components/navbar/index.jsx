import { FaAddressBook, FaHome, FaQuestion, FaBars, FaTimesCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import Social from '@/components/social'
import Logo from '@/components/logo'
import { useState } from "react"

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    
    const nav = [
        { title: "Início", url: "/", icon: FaHome },
        { title: "Sobre", url: "/sobre", icon: FaQuestion },
        { title: "Contato", url: "/contato", icon: FaAddressBook },
    ]
    
    return (
        <nav className="w-full flex items-center justify-between px-4 py-3 sticky top-0 z-20">  
            {/* Logo */}
            <Logo />              
            
            {/* Desktop menu */}
            <ul className="hidden md:flex items-center gap-6 text-base font-semibold">
                {nav.map((item, index) => (
                    <li 
                        key={index} 
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        <item.icon className="text-xl" />
                        <Link 
                            to={item.url}
                            className="relative group"
                        >
                            {item.title}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </li>
                ))}
            </ul>

            <Social />
            
            {/* Mobile menu */}
            <div 
                className={`md:hidden w-full fixed inset-0 bg-white/80 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            >
                <ul 
                    className={`md:hidden bg-white w-full max-w-xs h-full p-6 space-y-4 absolute top-0 left-0 shadow-xl z-30 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    {nav.map((item, index) => (
                        <li 
                            key={index} 
                            className="flex justify-center items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors duration-200 p-3 rounded-md hover:bg-blue-50"
                        >
                            <item.icon className="text-2xl" />
                            <Link 
                                className="w-full font-medium text-lg"
                                to={item.url} 
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex justify-end z-10">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none transition-transform duration-200"
                    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {isOpen ? <FaTimesCircle className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>
        </nav>
    )
}

export default NavBar