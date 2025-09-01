import app from "./src/app.js";
import colors from "colors"
import config from "./src/config/config.js";
import mongoose from "mongoose";


(async(req,res)=>{
    try{
        await mongoose.connect(config.MONGODB_URL)
        console.log("successfully connected to MongoDB".bgBlue.white);
        
    }catch(error){
        console.log(`error in DB connection ${error}`.bgRed.white);
      res.status(500).json({
        success:false,
        message:"Error in DB connection",
        error
      })
    }
})()
const PORT= config.PORT
app.listen(PORT,()=>{
    console.log(`app is running at PORT:${PORT}`.bgBlack.rainbow);
    
})