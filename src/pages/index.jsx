import { Outlet } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"

function App(){
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-7xl px-3 bg-gray-100 flex flex-col items-center gap-5">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App