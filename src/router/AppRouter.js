import React, { useEffect } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import CalendarApp from '../components/calendar/CalendarScreen';
import LoginScreen from '../components/auth/LoginScreen';
import Error from '../components/error/Error';
import { startChecking } from '../actions/auth';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';


const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector( state => state.auth );

  useEffect(() => {

    dispatch( startChecking() );

  }, [dispatch])


  if (checking) {
    return (<h1>Espere...</h1>);   //podemos colocar un loading
  }



  return (
    <BrowserRouter>
        <div>
            <Routes>

                <Route path="/" element={ <PublicRouter isAllowed={ !uid } redirectTo="/login" />   }>
                  <Route path="/" element={ <CalendarApp /> } />
                </Route>

                <Route path="/" element={ <PrivateRouter  isAllowed={ !!uid } redirectTo="/"   />   } >
                  
                  <Route exact path="/login" element={ <LoginScreen />} />

                </Route>

                <Route exact path="/error" element={ <Error />} />

                <Route exact path="*" element={ <Navigate replace to="/error" />} />

            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default AppRouter