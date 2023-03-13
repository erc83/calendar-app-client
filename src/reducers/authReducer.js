import { types } from "../types/types";
const initialState = {
    checking: true,   //cuando la aplicacion se cargue sera igual a true, se necesita verificar si esta autenticado mantener en la pantalla
    // uid: null,
    // name: null
}

export const authReducer = ( state = initialState, action  ) => {
    switch( action.type ) {
        case types.authLogin: 
            return {
                ...state,
                ...action.payload,
                checking: false     //porque ya lo autentico
            }

        /* case types.authRegister:
            return {
                ...state,
                checking: false,
                ...action.payload
            } */

        case types.authChekingFinish:    // no se tiene payload
            return {
                ...state,
                checking: false
            }

        case types.authLogout:   // aqui no retorno todo el state poeque quiero dejarlo lo mas puro posible
            return {
                checking: false
            }
        

        default:
            return state; 
    }
}