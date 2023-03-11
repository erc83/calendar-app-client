

//
const initialState = {
    checking: true,   //cuando la aplicacion se cargue sera igual a true, se necesita verificar si esta autenticado mantener en la pantalla
    // uid: null,
    // name: null
}


export const authReducer = ( state = initialState, action  ) => {

    switch( action.type ) {

        default:
            return state; 

    }

}