import React from 'react'
import { NavLink,} from 'react-router-dom'

const AdminLayput = () => {
  return (
    <div className='flex flex-row bg-slate-600 h-full p-2' >
     <div className='flex flex-col gap-2'>
     <NavLink to="/dashboard/admin/create-collection">create-collecton</NavLink>
        <NavLink to="/dashboard/admin/create-products">create-products</NavLink>      
        <NavLink to="/dashboard/admin/users">users</NavLink>      
        <NavLink to="/dashboard/admin/products">Products</NavLink>      
        <NavLink to="">Dashboard</NavLink>
     </div>
   </div>
  )
}

export default AdminLayput