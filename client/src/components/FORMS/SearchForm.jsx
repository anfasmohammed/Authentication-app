import React, { useContext } from 'react'
import SearchContext from '../context/searchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Search } from '@mui/icons-material'

const SearchForm = () => {
    const [values,setValues]=useContext(SearchContext)
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const{data}=await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values,results:data})
            navigate("/search-items")
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className='mb-6'>
        <form onSubmit={handleSubmit} className='relative'>
            <input type="text"
            placeholder='Search products...'
            className='w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={values.keyword}
            onChange={(e)=> setValues({...values,keyword:e.target.value})} />
            <button type='submit' className='absolute right-2 top-2 text-gray-400 hover:text-blue-500'><Search/></button>
        </form>
    </div>
  )
}

export default SearchForm