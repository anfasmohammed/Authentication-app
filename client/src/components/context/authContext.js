import { useState, createContext,useEffect } from "react";

const AuthContext=createContext()
export const AuthContextProvider=({children})=>{
    const [auth,setAuth]=useState({user:null,token:""})
    useEffect(()=>{
        const data=localStorage.getItem("auth")
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        //eslint-disable-next-line
    },[])
    let values={auth,setAuth}
    return(
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    )
}
export default AuthContext