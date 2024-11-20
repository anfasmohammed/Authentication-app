import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name is required"],
        trim:true,
        maxlength:[15,"Product name should not exeed 50 characters"]
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    collection:{
        type:mongoose.ObjectId,
        ref:"Collection",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    shipping:{
        type:Boolean
    }
},{timestamps:true})


export default mongoose.model("Product", productSchema)