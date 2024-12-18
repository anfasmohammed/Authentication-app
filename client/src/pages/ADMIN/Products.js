import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import AdminLayput from '../../components/AdminLayput';
import axios from 'axios';
import { Delete, Update } from '@mui/icons-material';

const Products = () => {
    
    const [products,setProduct]=useState([])
    console.log(products);
    
    const getAllProduct=async()=>{
        try {
            const {data}=await axios.get("/api/v1/product/getall-product")
            toast.success(data.message)
            setProduct(data.products)
        } catch (error) {
            console.log(error);
            toast.error(`something went wrong ${error}`)
        }
    }
    useEffect(()=>{getAllProduct()},[])
    
  return (
    
    <div className='flex'>
        <div>
            <AdminLayput/>
        </div>
        <div className='text-4xl font-semibold'>All products</div>
        <div className='flex p-2 gap-2'>
        {products.map((item)=>{
            return(
                <div key={item._id} className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                <img src={`/api/v1/product/getproduct-photo/${item._id}`} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
	<div className="flex flex-col justify-between  p-6 space-y-8">
		<div className="space-y-2 font-semibold">
			<h2 className="text-3xl font-semibold tracking-wide">{item.name}</h2>
			<p className="dark:text-gray-800">Price:{item.price}</p>
			<p className="dark:text-gray-800">Description: {item.description}</p>
		</div>
        <div className='flex justify-between'>
        <button type="button" className="flex items-center justify-center p-1 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"><Update/></button>
		<button type="button" className="flex items-center justify-center p-1 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"><Delete/></button>
        </div>
	</div>
    </div>
            )
        })}
        <div>
            
            </div>
        </div>
	

    </div>
  )

}

export default Products