import { Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AdminLayput from '../../components/AdminLayput'
import { useNavigate } from 'react-router-dom'

const {Option}=Select

const CreateProducts = () => {
  const [collection,setCollection]=useState("")
  const [collections,setCollections]=useState([])
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [photo,setPhoto]=useState("")
  const [shipping,setShipping]=useState(false)
  const navigate=useNavigate()

  const getAllCollection=async()=>{
    try {
      const {data}=await axios.get("/api/v1/collection/getAllCollection")
      if(data && data.success){
        toast.success(data.message)
        setCollections(data.collection)
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching collection")
    }
  }
useEffect(()=>{getAllCollection()},[])

//create product function
const handleCreate=async(e)=>{
  e.preventDefault()
try {
  const productData = new FormData()
  productData.append("name",name)
  productData.append("description",description)
  productData.append("price",price)
  productData.append("quantity",quantity)
  productData.append("photo",photo)
  productData.append("collection",collection)
  const {data}=await axios.post("/api/v1/product/create-product",productData)
  if(data.success){
    toast.success(data.message)
    navigate("/dashboard/admin/products")
  }else{
    toast.error(data.message)
    
  }
} catch (error) {
  toast.error(`something went wrong ${error}`)
    console.log(error);
}
}
  return (
    <div className='flex'>
      <AdminLayput/>
      <h1>CreateProducts</h1>
      <div className='flex flex-col gap-3 p-3'><Select bordered placeholder="selectC  ollection" size='large' showSearch className='w-[400px] border-none outline-none' onChange={(value)=>{setCollection(value)}}>{collections && collections.map((item)=>(<Option key={item._id} value={item._id}>{item.name}</Option>))}</Select>
      <div>
        <label className='bg-slate-600 px-6 py-2 rounded-md hover:bg-slate-400' > {photo? photo.name:"upload Photo"}
          <input type="file" name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} className='bg-orange-600 px-6 py-2 rounded-md' hidden />
          
          </label></div>
          <div>
            {photo && <div>
              <img src={URL.createObjectURL(photo)} alt="product Photo" className='w-[300px]' />
            </div>
}
            </div>
            <form action="">
            <div>
              <div className='flex flex-col'>
              <input type="text" 
              value={name}
              placeholder='Enter name'
              onChange={(e)=>setName(e.target.value)}
              className='w-[400px] ps-4 py-2 rounded-md mt-4 bg-gray-700 border-none outline-none' 
              />
              <textarea
              cols={56}
              rows={3}
              type="text"
              value={description}
              placeholder='Description'
              onChange={(e)=>setDescription(e.target.value)}
              className='w-[400px] ps-4 py-2 rounded-md mt-4 bg-gray-700 border-none outline-none'
              />
              <input type="number" 
              value={price}
              placeholder='price'
              onChange={(e)=>setPrice(e.target.value)}
              className='w-[400px] ps-4 py-2 rounded-md mt-4 bg-gray-700 border-none outline-none' 
              />
              <input type="number" 
              value={quantity}
              placeholder='Quantity'
              onChange={(e)=>setQuantity(e.target.value)}
              className='w-[400px] ps-4 py-2 rounded-md mt-4 bg-gray-700 border-none outline-none' 
              />  </div>
              <div>
                <Select
                bordered
                placeholder="Select Shipping"
                size='large'
                showSearch
                onChange={(value)=>{setShipping(value)}}
                className='w-[400px] border-none outline-none mt-6 bg-gray-700'>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                  </Select>
                  </div>
                  <div className='mt-6'>
                  <button className='bg-sky-900 px-6 py-2 rounded-md'
                  onClick={handleCreate}>
                    Create Product</button>
                      </div>
                      </div>  
            </form>
            </div>
            </div>
  )
}

export default CreateProducts