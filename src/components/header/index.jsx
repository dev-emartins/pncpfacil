
import NavBar from '@/components/navbar'

function Header() {
    
    return (
        <header className="w-full flex justify-center bg-white p-5 md:px-8 md:py-5 shadow-md">
          <section className="max-w-7xl w-full flex justify-between items-center">            
            <NavBar />            
          </section>
        </header>
    )
}

export default Header