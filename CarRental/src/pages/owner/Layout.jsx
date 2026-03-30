import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { useAppContext } from "../../context/AppContext";
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const {isOwner,navigate} = useAppContext()
  useEffect(() => {
    if(!isOwner){
      navigate('/')
    }
  
   
  }, [isOwner])
  


  return (
    <div className="flex flex-col h-screen">

      
      <NavbarOwner />              {/*  Top Navbar */}
      <div className="flex flex-1">     {/*  Main Section */}
            <Sidebar />                 {/* Sidebar */}
          <div className="flex-1 p-6 overflow-y-auto">  {/* Page Content */}
            <Outlet />
          </div>

      </div>

    </div>
  )
}

export default Layout