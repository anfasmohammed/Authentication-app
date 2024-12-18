import fs from "fs"
import slugify from "slugify";
import Product from "../models/productSchema.js"
import User from "../models/userSchema.js";

export const createProduct=async(req,res)=>{
try {
        //get info from the front end.As we have installed formidable we will grab info from req.fields and req.files instead of req.body
        const {name,description,price,collection,quantity,shipping}=req.fields
        const {photo}=req.files
        //validation
        if (!name||!description||!price){
            
            return res.status(404).json({
                success:false,
                message:"please fill all the fields"})
        }
        //photo validation
        if (!photo && photo.size>1000000){
            return res.status(500).json({
                success:false,
                message:"photo is required and should be less than 1MB"})
        }
           
    const product = await Product.create({...req.fields, slug:slugify(name)})
        // create new product
        //const product = new Product({...req.fields, slug:slugify(name)})
        // if there is photo we will make some changes in the product we recevied
        // sync the data through fs module ad pass the path
        
        if(photo){
            product.photo.data=fs.readFileSync(photo.path)
            product.photo.contentType=photo.type
            
            } 
            await product.save()
            
        res.status(201).json({
            success:true,
            message:"New product has been created successfull",
            product
        })
} catch (error) {
    console.log(error);
    
    res.status(500).json({
        success:false,
        message:`Error in creating new product${error}`,
        error,
    })
}
}

//get all product
export const getAllProduct=async(req,res)=>{
    try {
      const products=await Product.find({}).populate("collection").select("-photo").sort({createdAt:-1}).limit(12)  
      //here we can use multiple filters an we are not selecting photo to reduse the size of the request.we will create another api to get photos.
      res.status(200).json({
        success:true,
        productsCount:products.length,
        message:"successfully fetched all products",
        products
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error ehile fetching data",
            error
        })
        
    }
}

//get single product
export const getSingleProduct=async(req,res)=>{
    try {
        const product=await Product.findOne({slug:req.params.slug}).populate("collection").select("-photo")
        res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
         success:false,
         message:"Error while fetching data",
         error

        })
        
    }
}

//get product photo
export const productPhoto=async(req,res)=>{
    try {
       const product=await Product.findById(req.params.pid).select("photo")
       if (product.photo.data){
        res.set("Content-type",product.photo.contentType)
        return (
            res.status(200).send(product.photo.data))
       } 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error while fetching photo",
            error
        })
        
    }
}

//delete product
export const deleteProduct=async(req,res)=>{
    try {
       const productToDelete=await Product.findByIdAndDelete(req.params.pid).select("-photo")
       if(!productToDelete){
        return res.status(500)({
            success:false,
            message:"product not found"
        })
       }else{
        res.status(200).json({
            success:true,
            message:"Successfully deleted",
            productToDelete
           })
       }
       
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error while deleting product",
            error
        })
    }
}
//update product
export const updateProduct=async(req,res)=>{
    try {
       const {name,description,price,collection,quantity,shipping}=req.fields
       const {photo}=req.files
       if(!name||!description||!price){
        return res.status(404).json({
            success:false,
            message:"Enter all fields"
        })
       } 
       if(!photo && photo.size>1000000){
        return res.status(500).json({
            success:false,
            message:"photo is required or should less than 1BM"
        })
       }
       const product=await Product.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
       if(photo){
        product.photo.data=fs.readFileSync(photo.path)
        product.photo.contentType=photo.type
        
        } 
        await product.save()
        res.status(201).json({
            success:true,
            message:"Product updated successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error while updating data",
            error
        })
    }
}

//filter product

export const filterProduct=async(req,res)=>{
    try {
        const {checked,radio}=req.body
        let args={}
        if(checked.length>0)args.collection=checked
        if(radio.length) args.price={ $gte:radio[0],$lte:radio[1]}
        const products=await Product.find(args)
        res.status(200).json({
            success:true,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Error while filtering",
            error
        })
        }
}

// product count
export const productCount = async (req,res)=>{
    try {
        const totalProducts = await Product.find({}).estimatedDocumentCount()
        res.status(200).json({
            seccess:true,
            totalProducts
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success:false,
            message:"Error in product count",
            error
        })
    }
} 

// product list base on page
export const productList = async (req,res)=>{
    try {
        const perPage=2
        const page = req.params.page ? req.params.page:1
        const products= await Product.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in per page ctrl",
            error
        })
    }
}