import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../components/helpers/fetch"
import { types } from "../types/types";


export const startLogin = ( email, password) => {
    // el thunk dispone el dispatch
    return async ( dispatch) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json()

        if( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        
        } else {
            Swal.fire('Error', body.msg, 'error'); 
        }

    }
}

export const startRegister = ( email, password, name ) => {
    return async ( dispatch ) => {
        const resp = await fetchSinToken( 'auth/registro', { email, password, name }, 'POST' );
        const body = await resp.json()

        //console.log( body, "viendo pruba" )

        if( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        
        } else {
            Swal.fire('Error', body.msg, 'error'); 
        }
    }
}


// necesito disparar la accion que requiere el token     http://localhost:4000/api/auth/renovar    // 
export const startChecking = () => {   

        return async (dispatch) => {
            const resp = await fetchConToken( 'auth/renovar' ); // no requiere nada, no tiene body y por defecto es un GET
            const body = await resp.json()
    
            //console.log( body, "viendo pruba" )
    
            if( body.ok ) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem( 'token-init-date', new Date().getTime() );
                
                dispatch( login({     //aqui tenemos
                    uid: body.uid,
                    name: body.name
                }) )     
            } else {
                dispatch( checkingFinish() ); 
            }
        }
}

const checkingFinish = () => ({
    type: types.authChekingFinish
})



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})


export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();

        dispatch( logout() ) ;

    }
}

const logout = () => ({
    type: types.authLogout
})
