import User from "../models/userSchema.js"
import JWT from "jsonwebtoken"
import config from "../config/config.js"


export const cookieOption={
    expires:new Date(Date.now()+3*24*60*60*1000),
    httpOnly:true
}
export const signUp=async(req,res)=>{
    try{
        //get info from the frontEnd
        const {name,email,password,phone,address}=req.body

    //validation
    if(!name||!email||!password||!phone||!address){
        res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    //check if the user alrady exist in the data base
    const existinUser=await User.findOne({email})
    //if user exist sent response
    if(existinUser){
        res.status(200).json({
            success:false,
            message:"You have already signUp ,please login"
        })
    }
    //if user dosn't exist create new user
    const user=await User.create({
        name,
        email,
        password,
        phone,
        address
    })
    //send success message to the front end
    res.status(201).json({
        success:true,
        message:"successfully signed Up",
        user
    })

    }catch(error){
        console.log(error);
        res.status(500).json({
            seccess:false,
            message:`error in signing Up ${error}`,
            error
        })
        
    }
    
    
    
    
    
    
}

// login
export const login=async(req,res)=>{
    try {
        //get info from the front end
        const{email,password}=req.body

        //validate
        if (!email || !password){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        //check if the user exist in the data base
        const user= await User.findOne({email}).select("+password")

        //if the user dosn't exist send response
        if (!user){
            res.status(404).json({
                success:false,
                message:"no user found, please signup"
            })
        }

        //if user exist compare the password
        const isPasswordMatch=await user.comparePassword(password)

        //if password dosen't match send response
        if(!isPasswordMatch){
            res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }
        // if password match generate jwt token
        const token=JWT.sign({_id:user._id,role:user.role},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRY})

        //set up cookie
        res.cookie("token",token,cookieOption)

        //send sucess response
        res.status(200).json({
            success:true,
            message:"seccessfully logged in",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role,
                address:user.address
            },
            token
        })
        
    } catch (error) {
     console.log(error);
     res.status(500).json({
        success:false,
        message:`error in login ${error}`,
        error
     })
        
    }
}

//logout
export const logout=async(req,res)=>{
    try {
       res.cookie("tokan",null,{expires:new Date(Date.now()),
        httpOnly:true
       }) 
       res.status(200).json({
        success:true,
        message:"Seccessfully logged out"
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Error in logout ${error}`,
            error
        })
        
        
    }
}
