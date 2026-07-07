import { Outlet } from "react-router"
import { Header } from "../components/layouts/Header/Header"
import { Footer } from "../components/layouts/Footer/Footer"

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