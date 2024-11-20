import mongoos from "mongoose"

const collectionSchema=new mongoos.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        maxLength:[20,"name should not exeed 20 chars"],
        unique:true
    },
    
    slug:{
        type:String,
        lowercase:true
    }
},{timestamps:true})

export default mongoos.model("Collection",collectionSchema)