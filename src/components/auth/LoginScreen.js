import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useFormTodo } from '../../hooks/useFormTodo';
import './login.css'

const LoginScreen = () => {

    const dispatch = useDispatch(); 
    /* const initialForm = { 
        name: '', 
        age: 0, 
        email: '' 
    }  */
    
    const [ formLoginValues, handleLoginInputChange] = useFormTodo({
        lEmail: 'elena@gmail.com',
        lPassword: '123456'
    });

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault()

        dispatch( startLogin( lEmail, lPassword) )
        
       //  console.log( formLoginValues )
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
                    <form>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                          <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
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