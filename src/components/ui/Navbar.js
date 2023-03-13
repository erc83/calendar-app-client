import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

const Navbar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );


    const handleLogout = () => {
        dispatch( startLogout() ); 
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">

                <span className="navbar-brand" href="#">{ name }</span>
                



                <div>
                    <ul className="navbar-nav ms-auto">

                        <button 
                            className="btn btn-outline-danger"
                            onClick={ handleLogout }
                        >
                            <i className='fas fa-sign-out-alt'></i>
                            <span> Salir</span>
                        </button>
                    
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar