import {useState,useEffect} from 'react'
import axios from 'axios'

export default function useCollection(){
    const [collections,setCollections]=useState([])
//get collection
const getCollection=async()=>{
    try {
        const {data}=await axios.get("/api/v1/collection/get-collection")
        setCollections(data.collection)
    } catch (error) {
        console.log(error);
        
    }
}
useEffect(()=>{
    getCollection()
},[])

return collections
}
