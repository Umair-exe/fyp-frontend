import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { logout } from '../features/appSlice'
import { getToken } from '../helpers/getToken'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if(!getToken()) {
      dispatch(logout())
    }
  },[location]);
  
  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-2 bg-slate-600 min-h-screen hidden md:block'>
            <Sidebar />
        </div>
        <div className='col-span-10'>
            <Navbar />
            {children}
            <Outlet />
        </div>
    </div>
  )
}

export default Layout