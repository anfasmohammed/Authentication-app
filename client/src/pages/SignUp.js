import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'

const SignUp = () => {
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[phone,setPhone]=useState("")
  const[address,setAddress]=useState("")
  const navigate=useNavigate()
   // userSignUP

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
     const {data}= await axios.post("/api/v1/auth/signup",{name,email,password,phone,address})
     if(data.success){
      alert(data.message)
      navigate("/login")

     }else{
      alert(data.message) 
     }
    } catch (error) {
      console.log(error);
      alert(`something went wrong while signing Up ${error}`)
      
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
                <h2 className='card-title text-2xl mb-4'>SignUp</h2>
                <form onSubmit={handleSubmit}>
                   <div className='form-control mb-4'>
                    <input type="text"
                    placeholder='Name'
                    className='input input-bordered required:' 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className='form-control mb-4'>
                    <input type="email"
                    placeholder='Email'
                    className='input input-bordered required:' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div className='form-control mb-4'>
                    <input type="password"
                    placeholder='Password'
                    className='input input-bordered required:' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div className='form-control mb-4'>
                    <input type="text"
                    placeholder='Phone'
                    className='input input-bordered required:' 
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}/>
                  </div>
                  <div className='form-control mb-4'>
                    <textarea type="text"
                    placeholder='Address'
                    className='textarea textarea-bordered h-28 required:' 
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}/>
                  </div>
                  <div className='card-actions justify-center'>
                    <button type='submit' className='btn btn-primary'>
                      SignUp
                    </button>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        </div>
    /*<div className='bg-zinc-500 flex flex-col items-center '>
      <h1 className='text-2xl pt-5 font-semibold'>SignUp</h1>
      <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6  items-center py-5 '>
       <input type="text" placeholder='Name' name={name} value={name} onChange={(e)=>setName(e.target.value)} className=' border border-black px-5 py-1 rounded-md w-[300px]' required/>
       <input type="email" placeholder='Email' name={email} value={email} onChange={(e)=>setEmail(e.target.value)} className=' border border-black px-5 py-1 rounded-md w-[300px]' required/>
       <input type="password" placeholder='Password' name={password} value={password} onChange={(e)=>setPassword(e.target.value)} className=' border border-black px-5 py-1 rounded-md w-[300px]' required/>
       <input type="text" placeholder='Phone' name={phone} value={phone} onChange={(e)=>setPhone(e.target.value)} className=' border border-black px-5 py-1 rounded-md w-[300px]' required/>
       <input type="text" placeholder='Address' name={address} value={address} onChange={(e)=>setAddress(e.target.value)} className=' border border-black px-5 py-1 rounded-md w-[300px]' required/>
       <button className='bg-gray-400 hover:text-zinc-200 font-mono w-16 p-1 rounded' type='submit'>signup</button>

    </div>
    </form>
    </div>*/
  )
}

export default SignUp