import React, { useContext } from 'react'
import AdminLayput from '../../components/AdminLayput'
import AuthContext from '../../components/context/authContext.js'

const AdminDashboard = () => {
    const {auth}=useContext(AuthContext)
    
  return (
    <div>
        <div><AdminLayput/></div>
        <div>
            <li>Name:{auth.user.name}</li>
            <li>Phone:{auth.user.phone}</li>
            <li>Address:{auth.user.address}</li>
            <li>Email:{auth.user.email}</li>
        </div>
        AdminDashboard
    </div>
  )
}

export default AdminDashboard