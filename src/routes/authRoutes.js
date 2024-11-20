import express, { json } from "express"
import { login, logout, signUp, textController } from "../controllers/authControllers.js"
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js"

const router=express.Router()

// routes 
// signup || method:post
router.post("/signup",signUp)

//login || method:post
router.post("/login",login)

//logout
router.post("/logout",logout)

//middleware test route
router.get("/test",isLoggedIn,isAdmin, textController)

//user protected Auth route
router.get("/user-auth",isLoggedIn,(req,res)=>{
    res.status(200).json({
        ok:true
    })
})

//Admin protected Auth route
router.get("/admin-auth",isLoggedIn,isAdmin,(req,res)=>{
    res.status(200).json({
        ok:true
    })
})
export default router