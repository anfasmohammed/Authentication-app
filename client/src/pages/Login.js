import axios from 'axios'
import React, { useState,useContext } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import AuthContext from '../components/context/authContext'
import { ArrowBack } from '@mui/icons-material'


const Login = () => {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const {auth,setAuth}=useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
 


  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.post("/api/v1/auth/login",{email,password})
     if(data.success){
      alert(data.message)
      setAuth({
        ...auth,
        user:data.user,
        token:data.token
      })
      localStorage.setItem("auth",JSON.stringify(data))
      navigate(location.state||"/")
     }
      
    }catch(error){
      console.log(error)
    alert("error in login")
    }
  }

  
  return (
    <div className=" min-h-screen bg-primary-content/15">
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6 text-lg'>
          <ArrowBack className='size-5'/>Back</Link>
          <div className='card bg-primary-content/25'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4'>
                <input type="text"
                placeholder='Email'
                className='input input-bordered' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className='form-control mb-4'>
                <input type="text"
                placeholder='Password'
                className='input input-bordered' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div className='card-actions justify-center'>
                <button type='submit' className='btn btn-primary'>
                  Login
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login