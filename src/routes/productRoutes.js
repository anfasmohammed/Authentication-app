import express from "express"
import { createProduct, deleteProduct, filterProduct, getAllProduct, getSingleProduct, productCount, productList, productPhoto, updateProduct } from "../controllers/productConteollers.js"
import formidable from "express-formidable"
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js"

const router=express.Router()
//create product
router.post("/create-product",isLoggedIn,isAdmin,formidable(),createProduct)
//get all product
router.get("/getall-product",getAllProduct)
//get single product
router.get("/getsingle-product/:slug",getSingleProduct)
//get product photo
router.get("/getproduct-photo/:pid",productPhoto)
//delete product
router.delete("/delete-product/:pid",isLoggedIn,isAdmin,deleteProduct)
//update product
router.put("/update-product/:pid",isLoggedIn,isAdmin,formidable(),updateProduct)
//filter product
router.post("/filter-product",filterProduct)
//product count
router.get("/product-count",productCount)
//product per page
router.get("/product-list/:page",productList)

export default router