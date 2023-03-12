import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PublicRouter = ({ isAllowed, children, redirectTo="/login" }) => {
  
    if( isAllowed ) {
        return <Navigate to={ redirectTo } />
    }
    
    return <Outlet />
  
}

export default PublicRouter