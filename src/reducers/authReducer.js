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
                checking: false,     //porque ya lo autentico
                ...action.payload
            }

        case types.authRegister:
            return {
                ...state,
                checking: false,
                ...action.payload
            }


        default:
            return state; 
    }
}