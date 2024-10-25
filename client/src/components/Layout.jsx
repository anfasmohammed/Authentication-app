import React from 'react'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div>
        <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout