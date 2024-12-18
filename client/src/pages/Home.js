
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {Checkbox,Radio} from 'antd'
import {prices} from '../components/Prices'
import { AddShoppingCart, Refresh, Update } from '@mui/icons-material'
import Banner from '../components/Banner'
import { set } from 'mongoose'
// import { Delete, Update } from '@mui/icons-material';
/*import { useContext } from 'react'
import AuthContext from '../components/context/authContext'*/

const Home = () => {
/*const {auth} = useContext(AuthContext)*/
const [products,setProducts]=useState([])
const [collections,setCollections]=useState([])
const [checked,setChecked]=useState([])
const [radio,setRadio]=useState([])
const [totalProducts, setTotalProducts]=useState(0)
const [page,setPage]=useState(1)
const [loading,setLoading]=useState(false)

const getAllProduct=async()=>{
  try {
    setLoading(true)
    // check the productList controller thet we have created earlier, use it here and pass the page state
    const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
    setLoading(false)
    setProducts(data.products)
  } catch (error) {
    console.log(error);
    toast.error(`Something went worng ${error}`)
  }
}
useEffect(()=>{if(checked.length===0 || radio.length===0)getAllProduct()},[])

//get total count
const getTotal=async()=>{
  try{
      const{data}=await axios.get("/api/v1/product/product-count")
      setTotalProducts(data?.totalProducts)  
      }catch(error){
        console.log(error);
        
      }
    }
const getAllCollection=async()=>{
  try {
    const {data}=await axios.get("/api/v1/collection/getAllCollection")
    toast.success(data.message)
    setCollections(data.collection)
  } catch (error) {
    console.log(error);
    toast.error(`Somthing went wrong ${error}`)
    
  }
}
useEffect(()=>{getAllCollection()
  getTotal()},[])

//handle filter by collection

const handleFilter=(value,id)=>{
  let all=[...checked]
    if(value){
      all.push(id)
    }else{
      all=all.filter((item)=>item!==id)
    }setChecked(all)
}





//get filtered product
const getFilteredProducts=async()=>{
  try {
    const {data}=await axios.post("api/v1/product/filter-product",{checked,radio})
    setProducts(data.products)
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>{if(checked.length>0 || radio.length>0)getFilteredProducts()},[checked,radio])

  useEffect(()=>{
    if(page === 1)return
    loadMore()
  },[page])
//load more
const loadMore=async()=>{
  try {
    setLoading(true)
    const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
    setLoading(false)
    setProducts([...products,...data?.products])
  } catch (error) {
    console.log(error);
    setLoading(false)
  }
}

  return (
    /*<div className='p-2'>Home
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </div>*/
    

        <div>
          <Banner className="h-1/3"/>
          <div className='flex gap-1 p-1'>
         <div className='w-1/5 border border-slate-600 p-1'>
         <h1 className='font-semibold'>Filter by collections:</h1>
         <div className='flex flex-col gap-1'>
            {collections.map((item)=>{
              return(
                <Checkbox key={item._id} onChange={(e)=>handleFilter(e.target.checked,item._id)}>{item.name}</Checkbox>
              )
            })}
          </div>
         <h1 className='font-semibold'>Filter by price:</h1>
         <div className='flex flex-col gap-1'>
                <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                  {
                    prices.map((item)=>(
                      <div key={item._id}>
                        <Radio value={item.array}>{item.name}</Radio>
                      </div>
                    ))
                  }
                </Radio.Group>
          </div >
          <div className='flex justify-center pt-2'><button className='bg-slate-900 text-slate-50 p-1 rounded-md'onClick={()=>window.location.reload()} ><Refresh/></button></div>
         </div>
      <div className='w-4/5 p-2 border border-slate-600'>
      
      <h1 className='font-semibold text-2xl'>products:</h1>
      <div className="flex  gap-1 ">
      {products.map((item)=>{
        return(
          <div key={item.id} className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
	<img src={`/api/v1/product/getproduct-photo/${item._id}`} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
	<div className="flex flex-col justify-between p-6 space-y-8">
		<div className="space-y-2">
			<h2 className="text-3xl font-semibold tracking-wide">{item.name}</h2>
			<p className="dark:text-gray-800">Price:{item.price}</p>
			<p className="dark:text-gray-800">Description:{item.description}</p>
		</div>
    <div className='flex justify-between'>
    <button type="button" className="flex items-center justify-center p-1 font-semibold tracking-wide rounded-md dark:bg-slate-900 dark:text-gray-50"><AddShoppingCart/></button>
		<button type="button" className="flex items-center justify-center p-1 font-semibold tracking-wide rounded-md dark:bg-slate-900 dark:text-gray-50"><Update/></button>
    
    </div>
	</div>
</div>
        )
      })}
    </div>
    <div>{products && products.length < totalProducts && (
      <button onClick={(e)=>{
        e.preventDefault()
        setPage(page+1)
      }}>
        {loading? "Loading..":"Load more"}
      </button>
    )}</div>
      </div>
      </div>
      </div>
  )
}

export default Home