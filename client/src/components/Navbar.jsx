import MenuIcon from '@mui/icons-material/Menu'
import  { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthContext from './context/authContext.js'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Search, ShoppingCart } from '@mui/icons-material'


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
    <div className=' flex justify-between items-center px-6 bg-white shadow-md py-4 '>
        <div className='flex items-center'>
          <h1 className='text-xl font-bold text-slate-900'>StyleShop</h1>
          </div>
        <div className='hidden md:flex space-x-6 ml-10'>
          
            {auth.user?
            <ul className='flex gap-3 font-bold'>
            <li>Orders</li>
            <li>Profile</li>
            <li>Dashboard <span><ArrowDropDownIcon/></span></li>
            <li>Collection</li>
            <li onClick={handleLogout}>LogOut</li>
            </ul>
            :
            <ul className='flex gap-3 font-bold'>
            <NavLink to={"/login"}><li className='hover:text-blue-500'>Login</li></NavLink>
            <Link to={"/signUp"}><li className='hover:text-blue-500'>SignUp</li></Link>
          </ul>}
        </div>
        <div className='flex items-center space-x-4'>
          <button className='p-2 rounded-full hover:bg-gray-100'>
            <Search/>
          </button>
          <button className='relative p-2 rounded-full hover:bg-gray-100'>
            <ShoppingCart/>
            <span className='absolute -top-1 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>3</span>
          </button>
        </div>
        <div onClick={()=>setOpenMenu(open=>!open)} className=' block md:hidden'>{openMenu?<CloseIcon/>:<MenuIcon/>}
        {openMenu?
        <div>{auth.user?
          <ul className='absolute top-16 right-0 z-10 flex-col gap-8 font-bold bg-base-300 w-48 rounded'>
            <li className='border-b border-base-100 py-2 px-2 hover:bg-secondary-content/10'>Orders</li>
            <li className='border-b border-base-100 py-2 px-2 hover:bg-secondary-content/10'>Profile</li>
            <li className='border-b border-base-100 py-2 px-2 hover:bg-secondary-content/10'>Dashboard</li>
            <li className='border-b border-base-100 py-2 px-2 hover:bg-secondary-content/10'>Collection</li>
            <li className='py-2 px-2 hover:bg-secondary-content/10'>LogPut</li>
            </ul>
            :
            <ul className='absolute top-16 right-0 z-10 flex-col gap-8 font-bold bg-base-300 w-48 rounded'>
            <li className='border-b border-base-100 py-2 px-2 hover:bg-secondary-content/10'>LogIn</li>
            <li className='py-2 px-2 hover:bg-secondary-content/10'>SignIn</li>
            </ul>
             }
            </div>
        
          
          
        :
        <div></div>
      }
      </div>
    </div>
  )
}

export default Navbar