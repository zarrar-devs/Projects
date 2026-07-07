import Header from "./components/Header/Header"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer/Footer"


function MainLayout() {
  return (
    <>
    <Header></Header>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default MainLayout