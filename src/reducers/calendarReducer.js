// import moment from 'moment';
import { types } from '../types/types';

/*   objeto de referencia 
{
    id: '2323ioj3o2ji3oijoij, 
    title: 'Cumpleaños de Elías',
    start: moment().toDate(),    //new Date()
    end: moment().add( 2, 'hours').toDate(),
    notes: 'Comprar el Pastel',
    user: {
      _id:123,
      name: 'Eric'
    }
}
*/

const initialState = {
    events:[],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case types.eventSetActive:
            //console.log(action)
            return {
                ...state,
                activeEvent: action.payload
            }; 

        /* case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, 
                    action.payload
                ]
            } */
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, 
                    { ...action.payload }   
                ]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:    // necesito realizar un map para actualizar el evento con el id que tenga
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e 
                )
            }

        // no tengo action donde se tiene la informacion que se necesita para sabar el id de la nota activa
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )  // si es asi se van a regresar
                ),
                activeEvent: null
            }
            /*
        case types.eventUpdateInitEvent:
            console.log(action.payload, "revisando el payload")
            return {
                ...state,
                events: [...state.events], ...action.payload

            }
*/  
    
        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ]   //que son todos los nuevos eventos
            }

        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}