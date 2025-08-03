import { Link } from 'react-router-dom'
import logo1 from '@/assets/logo.png'
function Logo({ logo = logo1, size = "w-28 md:w-40" }){
    return (
        <Link to="/">
            <img className={ size } src={ logo } alt="Logo" />
        </Link>
    )
}

export default Logo