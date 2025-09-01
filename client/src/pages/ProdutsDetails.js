import { LocalDining } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ProdutsDetails = () => {
	const [product,setProduct]=useState({})
    const params=useParams()
	const [relatedProducts,setRelatedProducts]=useState([])
	//need to run the function when there is a change slug
	useEffect(()=>{
		if(params?.slug){getProduct()}
	},[params?.slug])

	//getSingleProduct
	const getProduct=async()=>{
		try{
			const{data}=await axios.get(`api/v1/product/getproduct/${params.slug}`)
			
			setProduct(data?.product)
			getSimilerProducts(data?.product._id,data?.collection._id)
		}catch(error){
			console.log(error);
			
		}
	}
	
   

	const getSimilerProducts = async(pid,cid)=>{
		try{
			const{data}=await axios.get(`api/v1/product/related-product/${pid} ${cid}`)
setRelatedProducts(data?.product)
		}catch(error){
			console.log(error)
		}
	}
  return (
    <div>
      {product?(<div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100 dark:text-gray-800">
	<div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
		<img src={`/api/v1/product/getproduct-photo/${product._id}`}  alt="" className="w-full h-60 sm:h-96 dark:bg-gray-500" />
		<div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
			<div className="space-y-2">
				<p rel="noopener noreferrer"  className="inline-block text-2xl font-semibold sm:text-3xl text-red-200">{product.name}</p>
				<p className="text-xs dark:text-gray-600">Rent:
					<p rel="noopener noreferrer"  className="text-xs hover:underline">{product.price}</p>
				</p>
			</div>
			<div className="dark:text-gray-800">
				<p>{product.description}</p>
			</div>
		</div>
    <div className='flex justify-between'><button className='rounded-xl bg-red-200 hover:bg-red-400 text-slate-600 px-5 lg:px-7 py-2 text-2xl'>Rent now </button>
	<button className='rounded-xl bg-red-200 hover:bg-red-400 text-slate-600 px-5 lg:px-7 py-2 text-2xl'><Link to=".." relative="path">Back to all~</Link> </button>
	</div>
	</div>
</div>):(
	<div><LocalDining/></div>
)}
{JSON.stringify(relatedProducts,null,4)}
    </div>
  )
}

export default ProdutsDetails