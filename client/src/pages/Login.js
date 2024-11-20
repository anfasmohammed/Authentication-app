import axios from 'axios'
import React, { useState,useContext } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import AuthContext from '../components/context/authContext'


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
    <div className='bg-zinc-500 flex flex-col items-center'>
      <h1 className='text-2xl pt-5 font-semibold'>Login</h1>
      <form onSubmit={handleSubmit} >
      <div className='flex flex-col gap-6  items-center py-5 '>
      <input 
      onChange={(e)=>setEmail(e.target.value)} 
      type="email" 
      placeholder='Email' 
      value={email} 
      name={email} 
      required
      className=' border border-black px-5 py-1 rounded-md w-[300px]' />
        <input 
        onChange={(e)=>setPassword(e.target.value)} 
        type="password" 
        placeholder='Password' 
        value={password} 
        name={password} 
        required
        className=' border border-black px-5 py-1 rounded-md w-[300px]'/>
        <button className='bg-gray-400 hover:text-zinc-200 font-mono w-16 p-1 rounded' type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login