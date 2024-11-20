import { useContext, useEffect } from "react"
import { useState } from "react"
import AuthContext from "../context/authContext.js"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Loader from "../Loader"

export default function UserRoute(){
    const[ok,setOk]=useState(false)
    const {auth}=useContext(AuthContext)
    useEffect(()=>{
        const authCheck = async()=>{
            const {data}=await axios.get("/api/v1/auth/user-auth")
            if(data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
       if (auth?.token) authCheck()
    },[auth?.token])
    return(
    ok?<Outlet/>:<Loader/>
    )
}