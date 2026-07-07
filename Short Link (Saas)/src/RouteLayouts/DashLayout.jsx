import { Outlet } from "react-router"
import { DashboardSidebar } from "../components/layouts/DashboardSidebar/DashboardSidebar"
import { DashNav } from "../components/layouts/DashboardNavbar/DashboardNavbar"
import { useState } from "react"


export function DashLayout() {

  const [showSideBar, setShowSideBar] = useState(false)

  return (
    <>
      <DashNav showSideBar={showSideBar} setShowSideBar={setShowSideBar}></DashNav>
      <div className="flex">
        <DashboardSidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar}></DashboardSidebar>
        <Outlet></Outlet>
      </div>
    </>
  )
}

