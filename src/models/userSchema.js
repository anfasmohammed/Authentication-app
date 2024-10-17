import mongoose from "mongoose";
import AuthRoles from "../utils/AuthRoles.js";
import bcrypt, { compare } from "bcrypt"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        maxLength:[20,"name should not exeed 20 chars"]

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Password should contain atleast 8 chars"],
        select:false
    },
    phone:{
        type:String,
        required:[true,"Phone number is required "]
    },
    address:{
        type:String,
        required:[true,"Adress is rwquired"],
        maxLength:[80,"Adress should not exeed 80 chars"]
    },
    role:{
        type:String,
        enum:Object.values.AuthRoles,
        default:AuthRoles.USER
    }
},{timestamps:true})
// mongoos hooks
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()
        this.password= await bcrypt.hash(this.password,10)
})

// Schema methods
userSchema.methods={
    comparePassword:async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }
}
export default mongoose.model("User",userSchema)