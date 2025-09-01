import express from "express"
import { createProduct, deleteProduct, filterProduct, getAllProduct, getSingleProduct, productCount, productList, productPhoto, relatedProducts, searchProduct, updateProduct } from "../controllers/productConteollers.js"
import formidable from "express-formidable"
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js"

const router=express.Router()
//create product
router.post("/create-product",isLoggedIn,isAdmin,formidable(),createProduct)
//get all product
router.get("/getall-product",getAllProduct)
//get single product
router.get("/getproduct/:slug",getSingleProduct)
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
//search product
router.get("/search/:keyword",searchProduct)

//similar products
router.get("/related-products/:pid/:cid",relatedProducts)

export default router