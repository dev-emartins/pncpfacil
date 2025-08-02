import { Outlet } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"

function App(){
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-9/10 bg-gray-100 flex flex-col items-center gap-5">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App