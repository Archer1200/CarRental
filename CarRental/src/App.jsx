import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { useLocation, Routes, Route } from 'react-router-dom'
import { useAppContext } from './context/AppContext'
import Home from './pages/Home'
import CarDetails from './pages/CarDetail'
import Cars from './pages/Cars'
import MyBooking from "./pages/MyBooking"
import Login from './components/Login'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'


// Owner Pages
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import Addcar from './pages/owner/Addcar'
import Managecars from './pages/owner/Managecars'
import Managebooking from './pages/owner/Managebooking'

const App = () => {

  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
    <Toaster/>
    {showLogin &&<Login />}
      {!isOwnerPath && <Navbar />}

      <Routes>
        {/* User Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/mybooking' element={<MyBooking/>}/>

        {/* Owner Routes (Nested) */}
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<Addcar/>}/>
          <Route path='manage-cars' element={<Managecars/>}/>
          <Route path='manage-bookings' element={<Managebooking/>}/>
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App