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
        <nav className="w-full flex items-center justify-between md:px-4">  
            {/* Logo */}
            <Logo />              
            
            {/* Desktop menu */}
            <ul className="hidden md:flex items-center gap-6 text-base font-semibold">
                {nav.map((item, index) => (
                    <li 
                        key={index} 
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                    >
                        <item.icon className="text-xl align-middle" />
                        <Link 
                            to={item.url}>
                            {item.title}
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
                    className={`md:hidden bg-white w-full max-w-xs h-full p-6 pt-8 space-y-4 absolute top-0 left-0 shadow-xl z-30 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    {nav.map((item, index) => (
                        <li 
                            key={index} 
                            className="flex justify-center items-center gap-3 text-blue-500 hover:text-blue-600"
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
                    className="text-blue-500 hover:text-blue-600"
                    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {isOpen ? <FaTimesCircle className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>
        </nav>
    )
}

export default NavBar