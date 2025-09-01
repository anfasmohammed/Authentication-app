
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Checkbox, Radio } from 'antd'
import { prices } from '../components/Prices'
import { AddShoppingCart, More, Refresh, Update } from '@mui/icons-material'
import Banner from '../components/Banner'
import SearchForm from '../components/FORMS/SearchForm'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
// import { Delete, Update } from '@mui/icons-material';
/*import { useContext } from 'react'
import AuthContext from '../components/context/authContext'*/

const Home = () => {
  /*const {auth} = useContext(AuthContext)*/
  const [products, setProducts] = useState([])
  const [collections, setCollections] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getAllProduct = async () => {
    try {
      setLoading(true)
      // check the productList controller thet we have created earlier, use it here and pass the page state
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      console.log(error);
      toast.error(`Something went worng ${error}`)
    }
  }
  useEffect(() => { if (checked.length === 0 || radio.length === 0) getAllProduct() }, [])

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count")
      setTotalProducts(data?.totalProducts)
    } catch (error) {
      console.log(error);

    }
  }
  const getAllCollection = async () => {
    try {
      const { data } = await axios.get("/api/v1/collection/getAllCollection")
      toast.success(data.message)
      setCollections(data.collection)
    } catch (error) {
      console.log(error);
      toast.error(`Somthing went wrong ${error}`)

    }
  }
  useEffect(() => {
    getAllCollection()
    getTotal()
  }, [])

  //handle filter by collection

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((item) => item !== id)
    } setChecked(all)
  }





  //get filtered product
  const getFilteredProducts = async () => {
    try {
      const { data } = await axios.post("api/v1/product/filter-product", { checked, radio })
      setProducts(data.products)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => { if (checked.length > 0 || radio.length > 0) getFilteredProducts() }, [checked, radio])

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])
  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  return (
    /*<div className='p-2'>Home
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </div>*/


    <div className='bg-gray-50 text-gray-800 min-h-screen'>
      <div className='relative min-h-screen'>
        <Navbar className='absolute left-0' />


        <Banner />
        {/* main Content */}
        <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row gap-6'>

            {/* Filters Sidebar */}
            <div className='w-full lg:w-1/5 bg-white p-6 rounded-lg shadow-md filter-section '>
              <h1 className='font-semibold text-lg mb-4'>Filter by collections:</h1>
              <div className='flex flex-col gap-3 mb-6'>
                {collections.map((item) => {
                  return (
                    <Checkbox key={item._id} onChange={(e) => handleFilter(e.target.checked, item._id)}>
                      <label className='text-gray-700' >{item.name}</label>
                    </Checkbox>
                  )
                })}
              </div>
              <h1 className='font-semibold text-lg mb-4'>Filter by price:</h1>
              <div >
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {
                    prices.map((item) => (
                      <div className='flex flex-col mb-3' key={item._id}>
                        <Radio value={item.array}>
                          <label className='text-gray-700' >{item.name}</label>

                        </Radio>
                      </div>
                    ))
                  }
                </Radio.Group>
              </div >
              <div className='flex justify-center pt-2'>
                <button className='bg-slate-800 text-white px-4 py-2 rounded-md flex items-center hover:bg-slate-500 transition-colors' onClick={() => window.location.reload()} ><Refresh className='mr-2' /> Reset Filters</button></div>
            </div>

            {/* Product Section */}
            <div className='w-full lg:4/5 bg-white p-6 rounded-lg shadow-md'>

              <SearchForm />

              <h1 className='font-semibold text-2xl mb-6'>products:</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">

                {/* Product Cards */}
                {products.map((item) => {
                  return (
                    <div key={item.id} className="product-card bg-white rounded-lg overflow-hidden">
                      <img src={`/api/v1/product/getproduct-photo/${item._id}`} alt={item.name} className="object-cover w-full h-72" />
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-2xl font-semibold">{item.name}</h2>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">{item.price}</span>
                        </div>
                          <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className='flex justify-between'>
                          <button type="button" className="bg-slate-800 text-white p-2 rounded-md hover:bg-slate-500 transition-colors"><AddShoppingCart /></button>
                          <button type="button" className="bg-slate-800 text-white p-2 rounded-md hover:bg-slate-500 transition-colors"><Link to={`/${item.slug}`}><More /></Link></button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Load More Button */}

              <div className='mt-8 text-center'>{products && products.length < totalProducts && (
                <button
                className='load-more bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors'
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}>
                  {loading ? "Loading.." : "Load More Products"}
                </button>
              )}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  )
}

export default Home