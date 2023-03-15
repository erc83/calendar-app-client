import Swal from 'sweetalert2';

import { fetchConToken } from '../components/helpers/fetch';
import { prepareEvents } from '../components/helpers/prepareEvents';
import { types } from '../types/types';


export const eventStartAddNew = ( event ) => {    // este event se que funciona si graba en la base de datos
    return async(dispatch, getState) => {
        
        const { uid, name } = getState().auth; 
        
        try {    //manejamos la excepcion  si hay algun problama con el backend
            const resp = await fetchConToken("events/evento", event, 'POST');
            const body = await resp.json();
            
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

const eventAddNew = (event) => ({    
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


export const eventStartUpdate = ( event ) => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`events/evento/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error'); 
            }

        } catch (error) {
            console.log(error)
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
})



export const eventStartDelete = () => {
    return async( dispatch, getState ) => {
     
        const { id } = getState().calendar.activeEvent

        try {
            const resp = await fetchConToken(`events/evento/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error'); 
            }

        } catch (error) {
            console.log(error)
        }

    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
})

/*
export const eventUpdateInitEvent =  ( event ) => ({
    
    type: types.eventUpdateInitEvent,
    payload: event
})
*/

 
export const eventStartLoading = () => {        
    return async (dispatch) => {
        try {
            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            const events = prepareEvents( body.eventos ) ;
            dispatch( eventLoaded( events ) )   
        } catch (error) {
            console.log(error)
        }
    }
}


const eventLoaded = ( events ) => ({  
    type: types.eventLoaded,
    payload: events
})


export const eventLogout = () => ({
    type: types.eventLogout 
});




