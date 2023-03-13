import { fetchConToken } from "../components/helpers/fetch";
import { types } from "../types/types";


export const eventStartAddNew = ( event ) => {    // este event se que funciona si graba en la base de datos
    return async(dispatch, getState) => {
        
        const { uid, name } = getState().auth; 
        
        try {    //manejamos la excepcion  si hay algun problama con el backend
            const resp = await fetchConToken("events/evento", event, 'POST');
            const body = await resp.json();
            
            // console.log(body, "viendo el body")
            
            if( body.ok ) {
                event.id = body.evento.id;
                event.user = {         // creando el usuario desde el state 
                    _id: uid,
                    name: name
                }
                // console.log( event, "viendo el event" )
                dispatch( eventAddNew( event )) ;      
            }
        } catch (error) {
            console.log(error)
        }
    }
} 

const eventAddNew = (event) => ({    // para agregarlo en la base de datos no se exporta porque lo uso en este archivo
    type: types.eventAddNew,
    payload: event
});


export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
}); 

export const eventClearActiveEvent = () => ({ 
    type: types.eventClearActiveEvent
})

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
})


export const eventDeleted = () => ({
    type: types.eventDeleted
})

/*
export const eventUpdateInitEvent =  ( event ) => ({
    
    type: types.eventUpdateInitEvent,
    payload: event
})
*/
