import { Outlet } from "react-router-dom"
import Footer from "./Footer.jsx"
import Navbar from "./Navbar.jsx"
import 'aos/dist/aos.css';
function Layout() {
  return (
    <>
  <Navbar/>
  <div className="mainpage container-fluid mt-5  " data-aos="zoom-in-down" data-aos-duration="1300">
    <Outlet></Outlet>
  </div>
  
  <Footer/>
    </>
  )
}

export default Layout
