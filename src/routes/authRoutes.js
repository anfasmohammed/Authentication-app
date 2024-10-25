import express from "express"
import { login, logout, signUp } from "../controllers/authControllers.js"

const router=express.Router()

// routes 
// signup || method:post
router.post("/signup",signUp)

//login || method:post
router.post("/login",login)

//logout
router.post("/logout",logout)

export default router