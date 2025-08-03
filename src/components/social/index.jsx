import { Link } from 'react-router-dom'
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6"

function Social({ color = "text-blue-500 hover:text-blue-600" }) {
    const socialMedias = [
      { name: "Email", icon: FaEnvelope, link: "mailto:everaldoinfortecnico@gmail.com" },
      { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/dev_emartins" },
      { name: "Linkedin", icon: FaLinkedin, link: "https://www.linkedin.com/in/everaldomartins" },
      { name: "GitHub", icon: FaGithub, link: "https://github.com/dev-emartins" },
    ]
    return (
        <div className="flex items-center gap-3 pt-1 md:py-0.5">
            {
                socialMedias.map((item, index) => (
                    <Link key={ index } to={ item.link } target="_blank" className={ color }>
                        <item.icon className="md:text-2xl text-xl" title={ item.name } />
                    </Link>
                ))
            }
        </div>
    )
}

export default Social