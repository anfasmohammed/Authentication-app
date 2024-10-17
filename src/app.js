import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import crypto from "crypto"

const app=express()

// middlewares
app.use(cors())// allows to interact whit client which is loaded in different domain.
app.use(express.json())// instructing the app to accept data in the json format.
app.use(cookieParser()) // it allows the server to access the use cookies
app.use(morgan("dev")) // logs requestes errors and more to the console

//routes
app.use("/api/v1/auth",authRoutes)

//secret key generation
/*
const key=crypto.randomBytes(64).toString("hex")
console.log(key);
*/

app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})
export default app