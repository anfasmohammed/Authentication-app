import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext.js";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loader from "../Loader.jsx";


export default function AdminRoute(){
    const [ok,setOk]=useState(false)
    const {auth}=useContext(AuthContext)
    useEffect(()=>{
        const authCheck=async()=>{
            const {data}=await axios.get("/api/v1/auth/admin-auth")
            if (data.ok) {
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if (auth?.token) authCheck()
    },[auth?.token])
    return ok?<Outlet/>:<Loader/>
}