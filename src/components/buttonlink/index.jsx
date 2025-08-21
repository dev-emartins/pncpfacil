import { Link } from "react-router-dom"

function ButtonLink({ icon: Icon, text: text, link: link }) {
    return (
        <Link to={ link } className="w-full md:w-fit flex justify-center md:justify-between items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 cursor-pointer">
            <Icon className="text-2xl" /> 
            <span className="font-sans font-medium text-base">{ text }</span>
        </Link>
    )
}

export default ButtonLink