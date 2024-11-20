import React from 'react'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Toaster } from 'sonner'


const Layout = () => {
  return (
    <div>
        <Navbar/>
    <Outlet/>
    <Footer/>
    <Toaster position='top-right' richColors />
    </div>
  )
}

export default Layout