import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = ( {isAllowed, children, redirectTo="/" } ) => {

    if ( isAllowed ) {
        return <Navigate to = { redirectTo } />
    }

  return <Outlet />

}

export default PrivateRouter