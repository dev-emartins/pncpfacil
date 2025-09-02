import { FaAddressBook, FaHome, FaQuestion, FaBars, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Social from '@/components/social'
import Logo from '@/components/logo'
import { useState } from "react";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const nav = [
        { title: "Inicío", url: "/", icon: FaHome },
        { title: "Sobre", url: "/sobre", icon: FaQuestion },
        { title: "Contato", url: "/contato", icon: FaAddressBook },
    ];
    
    return (
        <nav className="w-full flex items-center justify-between">  

            {/* Logo */}
            <Logo />              
            
            {/* Desktop menu */}
            <ul className="hidden md:flex items-center gap-4 text-base font-bold md:p-1.5">
                {nav.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                        <item.icon className="text-xl" />
                        <Link to={item.url}>{item.title}</Link>
                    </li>
                ))}
            </ul>

            <Social />
            
            {/* Mobile menu */}
            {isOpen && (
                <ul className="md:hidden bg-white min-w-dvw p-2 pt-7 space-y-3 absolute top-14 left-0 shadow-lg z-10">
                    {nav.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-center text-blue-500 hover:text-blue-600 p-2">
                            <item.icon className="text-xl" />
                            <Link to={item.url} onClick={() => setIsOpen(false)}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex justify-end p-2">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-blue-500 hover:text-blue-600 focus:outline-none"
                >
                    { !isOpen ? <FaBars className="text-2xl" /> : <FaTimesCircle className="text-2xl" />}
                </button>
            </div>
        </nav>
    );
}

export default NavBar;