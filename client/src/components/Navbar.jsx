import MenuIcon from '@mui/icons-material/Menu'
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from './context/authContext'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';


const Navbar = () => {
  const [Navbar,setNavbar]=useState(false)
  const{auth,setAuth}=useContext(AuthContext)
  const navigate=useNavigate()

  const handleLogout=async()=>{
  try {
    const {data}=await axios.post("/api/v1/auth/logout")
    if (data.success) {
      alert(data.message)
      setAuth({
        ...auth,
        user:null,
        token:""
      })
      localStorage.removeItem("auth")
      navigate("/")
    }
  } catch (error) {
    console.log(error);
    alert(`something went wrong`)
    
  }
  }

  return (
    <div className='flex justify-between items-center h-20 px-2 bg-slate-600'>
        <div className='text-2xl font-bold hover:text-gray-400'>LOGO</div>
        
        <div className='flex gap-4 font-bold'>
        <div className='hover:text-gray-400'><NavLink to={"/"}>Home</NavLink></div>
          {auth.user?
          <ul className='md:flex sm:hidden  gap-4 font-bold'>
                <li className='hover:text-gray-400'><NavLink to={"/collection"}>Collection</NavLink></li>
                <li className='hover:text-gray-400' onClick={handleLogout}><NavLink>Logout</NavLink></li>
                </ul>
                :
            <ul className='md:flex sm:hidden gap-4 font-bold'>
                <li className='hover:text-gray-400'><NavLink to={"/login"}>Login</NavLink></li>
                <li className='hover:text-gray-400'><NavLink to={"/signup"}>SignUP</NavLink></li>
            </ul>
          }
          <div onClick={()=>{setNavbar(open=>!open)}}>{Navbar?<CloseIcon/> :<MenuIcon/>}</div>
        </div>
    </div>
  )
}

export default Navbar