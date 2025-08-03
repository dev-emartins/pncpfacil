import { FaAddressBook, FaHome, FaQuestion } from "react-icons/fa"
import { Link } from "react-router-dom"

function NavBar(){
    const nav = [
        { title: "Inicío", url: "/", icon: FaHome },
        { title: "Sobre", url: "/about", icon: FaQuestion },
        { title: "Contato", url: "/contact", icon: FaAddressBook },
    ]
    return (
        <>
            <nav>
                <ul className="flex items-center gap-4 text-base font-bold p-1.5">
                    {nav.map((item) => (
                        <li key={ item.title } className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                            <item.icon className="text-xl" />
                            <Link to={ item.url } >{ item.title }</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default NavBar