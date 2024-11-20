import express from "express"
import {createCollection, deleteCollection, getAallCollection, getSingleCollection, updateCollection} from "../controllers/collectionControllers.js"


const router=express.Router()

// createCollection || method:post
router.post("/create-collection",createCollection)
//DeleteCollection || method:delete
router.delete("/delete-collection/:id", deleteCollection)
// getAllCollection || method:post
router.get("/getAllCollection",getAallCollection)
// getsibglecollection || method:post
router.get("/getsinglecollection/:slug",getSingleCollection)
// update collection || method:put
router.put("/update-collection/:id",updateCollection)
export default router