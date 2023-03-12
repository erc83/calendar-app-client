import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { startLogin, startRegister } from '../../actions/auth';
import { useFormTodo } from '../../hooks/useFormTodo';
import './login.css'

const LoginScreen = () => {

    const dispatch = useDispatch(); 
    /* const initialForm = { 
        name: '', 
        age: 0, 
        email: '' 
    }  */
    
    // manejo de loginUsuario
    const [ formLoginValues, handleLoginInputChange] = useFormTodo({
        lEmail: 'elena@gmail.com',
        lPassword: '123456'
    });
    const { lEmail, lPassword } = formLoginValues;
    
    // manejo de registroUsuario
    const [ formRegisterValues, handleRegisterInputChange] = useFormTodo({
        rName: 'elias@gmail.com',
        rEmail: 'elias@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues



    const handleLogin = (e) => {
        e.preventDefault()

        dispatch( startLogin( lEmail, lPassword) )
        
       //  console.log( formLoginValues )
    }

    const handleRegister = (e) => {
        e.preventDefault()
        // console.log( formRegisterValues )

        if ( rPassword1 !== rPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error'); 
        }

        dispatch( startRegister( rEmail, rPassword1, rName ) )


    }





  return (
    <div className="container login-container">
            <div className="row">
                {/* inicio form login */}
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
                {/* termino form login */}

                {/* inicio form register */}
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }

                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }

                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }

                            />
                        </div>

                        <div className="form-group mb-2">
                          <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }

                                />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
                {/* termino form register */}
            </div>
        </div>
  )
}

export default LoginScreen