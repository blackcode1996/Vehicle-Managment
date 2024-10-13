import { Outlet } from "react-router-dom"
// import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Header from "../components/Header"

const Wrapper = () => {
  return (
    <div className="h-[100%]">
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Wrapper