import Collection from "../models/collectionSchema.js";
import slugify from "slugify";

//create collection
export const createCollection=async(req,res)=>{
try {
 // get info from the frontend
 const {name}=req.body
 //validation
 if(!name){
    res.status(400).json({
        success:false,
        message:`name is required`
    })
 }
 //check if the collection already exist
 const existingCollection=await Collection.findOne({name})
 //if the collection exit send response
 if (existingCollection) {
  return res.status(200).json({
    success:false,
    message:`Collection already exist`
  })  
 }
 // if the collection dosen't exist create collection 
 const collection=await Collection.create({name,slug:slugify(name)})

 //send success response to the front end
 res.status(201).json({
    success:true,
    message:"new collection has been created successfully",
    collection
})

} catch (error) {
   console.log(error);
   res.status(500).json({
    success:false,
    message:`erroe in creating collection ${error}`,
    error
   })
    
}
}

export const deleteCollection = async (req, res) => {
   try {
      const {id}=req.params
      const collectionToDelete=await Collection.findByIdAndDelete(id)
      //if there  is no collection to delete, send status code
      if (!collectionToDelete) {
         return res.status(404)
      } 
      res.status(200).json({
         success:true,
         message:"collection has been deleted successfully"
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success:false,
         message:`erroe in deleting collection ${error}`,
         error
      })
      
   }
} 
export const getAallCollection=async(req,res)=>{
   try {
      const collection=await Collection.find({})
      res.status(200).json({
         success:true,
         count:collection.length,
         message:`collection has been fetched successfully`,
         collection
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success:false,
         message:`error in fectching collection ${error}`,
         error
      })
      
      
   }
}
export const getSingleCollection=async(req,res)=>{
   try {
      const singleCollection=await Collection.findOne({slug:req.params.slug})
      res.status(200).json({
         success:true,
         message:`collection has been fetched successfully`,
         singleCollection
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         status:false,
         message:`error in fetching single collection`,
         error
      })
      
   }
}

export const updateCollection=async(req,res)=>{
   try {
      const {name}=req.body
      const {id}=req.params
      const collection=await Collection.findByIdAndUpdate(
         id,
         {name,slug:slugify(name)},
         {new:true}
      )
      res.status(200).json({
         success:true,
         message:`updated successfully`,
         collection
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success:false,
         message:`error in updating collection ${error}`,
         error
      })
      
   }
}