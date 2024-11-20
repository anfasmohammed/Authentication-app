import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
   <div>
     <ul>
        <li><NavLink to={"profile"}>profile</NavLink></li>
        <li><NavLink to={"orders"}>orders</NavLink></li>
        <li><NavLink to={""}>Dashboard</NavLink></li>
    </ul>
    <Outlet/>
   </div>
  )
}

export default UserLayout