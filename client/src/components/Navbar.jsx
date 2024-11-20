import MenuIcon from '@mui/icons-material/Menu'
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthContext from './context/authContext.js'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Navbar = () => {
  const [Navbar,setNavbar]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)
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
        
        <div className=' flex items-center  gap-4 font-bold'>
        <div className={` md:static  flex flex-col md:flex-row md:gap-4 absolute duration-300 ${Navbar?"bg-slate-600 py-2 top-[80px] right-0 border-t border-zinc-500":"top-[80px] right-[-75px]"}`} >
        <div className={`hover:text-gray-400 ${Navbar?"border-b border-zinc-500 px-2":""}`}><NavLink to={"/"}>Home</NavLink></div>
          {auth.user?
          <ul className='flex flex-col md:flex-row md:gap-4 font-bold'>
               <div onClick={()=>{setOpenMenu(!openMenu)}}>
               <li className={`cursor-pointer hover:text-gray-400 ${Navbar?"border-b border-zinc-500 px-2":""}`}  >{auth.user.role}<ArrowDropDownIcon/></li>
               
               {openMenu?
                   <div className=' cursor-pointer flex flex-col absolute bg-slate-600 pb-1 '>
                    <p className=' border-y border-zinc-500 px-1 hover:text-gray-400'>Orders</p>
                    <p className='px-1 hover:text-gray-400'>Profile</p>
                    <Link to={`/dashboard/${auth.user.role==="USER"?"user":"admin"}`}>dashboard</Link>
                   </div>
                :" "}
               </div>
                
                <li className={`hover:text-gray-400 ${Navbar?"border-b border-zinc-500 px-2":""}`}><NavLink to={"/collection"}>Collection</NavLink></li>
                <li className={`hover:text-gray-400 ${Navbar?"px-2":""}`} onClick={handleLogout}><NavLink>Logout</NavLink></li>
                </ul>
                :
            <ul className='flex flex-col md:flex-row md:gap-4 font-bold'>
                <li className={`hover:text-gray-400 ${Navbar?"border-b border-zinc-500 px-2":""}`}><NavLink to={"/login"}>Login</NavLink></li>
                <li className={`hover:text-gray-400 ${Navbar?"px-2":""}`}><NavLink to={"/signup"}>SignUP</NavLink></li>
            </ul>
          }
        </div>
          <div className='flex md:hidden' onClick={()=>{setNavbar(open=>!open)}}>{Navbar?<CloseIcon/> :<MenuIcon/>}</div>
        </div>
    </div>
  )
}

export default Navbar