import React, { useEffect, useState } from 'react';
import { useDispatch,  useSelector } from "react-redux";
import { uiCloseModal } from '../../actions/ui';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'                   
import { eventClearActiveEvent, eventStartAddNew, /* eventUpdated */ eventStartUpdate } from '../../actions/eventsCalendar';

const customStyles = {  
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); 
const nowPlus1 = now.clone().add( 1, 'hours' );

const initEvent = {    
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}

export const CalendarModal = ( ) => {


    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );

    const dispatch = useDispatch();
    
    const [ dateStart, setDateStart ] = useState(  now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );

    const [titleValid, setTitleValid] = useState( true )      

    const [ formValues, setFormValues ] = useState( initEvent )

    const { notes, title, start, end } = formValues;    

  useEffect(() => {   
    if( activeEvent ){
      setFormValues( activeEvent )
    } else {
      setFormValues( initEvent )  // si es null el activeEvent  entonces se inicializa el modal
    }

  }, [activeEvent, setFormValues])  

    const handleInputChange = ({ target }) => {  

      setFormValues({            
        ...formValues,
        [target.name]: target.value
      });

    }

    const handleStartDateChange = ( e ) => {     
        setDateStart( e )
        setFormValues({                 
          ...formValues,
          start: e 
        })
  
    }

    const handleEndDateChange = ( e ) => {
      setDateEnd( e )
      //console.log( e )
      setFormValues({                 
        ...formValues,
        end: e 
      })

    }

    const closeModal = () => {
        dispatch( uiCloseModal() )
        dispatch( eventClearActiveEvent() );    //cambia el activeEvent a null cerrando el modal
        setFormValues( initEvent )          
    }


    const handleSubmitForm = (e) => {     
      e.preventDefault();
      //console.log( formValues )

      const momentStart = moment( start );        
      const momentEnd = moment( end );
      //console.log(momentStart)
      //console.log(momentEnd)

      
      if(momentStart.isSameOrAfter( momentEnd ) ){   
        //console.log('Fecha 2 debe de ser mayor')
        Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error')
        return;
      }

      if( title.trim().length < 2 ){                
        //return;                                      
        return setTitleValid( false );              
      }

      //TODO: falta realizar la grabacion en la base de datos
      // realizamos temporalmente
      

      if ( activeEvent ){
        //dispatch( eventUpdated ( formValues ) )   // si existe el event lo actualiza 
        dispatch( eventStartUpdate ( formValues ) )   // si existe el event lo actualiza 
      }else{
        dispatch( eventStartAddNew( formValues ) );  // queda mucho mas sencillo
      }

      setTitleValid(true);                          
      closeModal();
    }

  return (
    <Modal
        /* isOpen={ true } */
        isOpen={ modalOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className='modal'
        overlayClassName='modal-fondo'   
    >
        {/* Inicio contenido Modal */}
        <h1> { (activeEvent) ? 'Editar evento' : 'Nuevo Evento'}  </h1>
        <hr />
        <form 
          className="container"
          onSubmit={ handleSubmitForm }                
        
        >
            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DateTimePicker 
                  onChange={ handleStartDateChange } 
                  /* value={ startDate.toDate() } */ 
                  /* value={ (inicioEvento === undefined  )? dateStart: inicioEvento }*/  
                  value={ dateStart } 
                  className="form-control"
                />
            </div>
            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DateTimePicker 
                  onChange={ handleEndDateChange } 
                  /* value={ startDate.toDate() } */ 
                 /*  value={ (inicioEvento=== undefined ) ? dateEnd: terminoEvento  }  */
                  value={ dateEnd } 
                  minDate={ dateStart }
                  className="form-control"
                />
            </div>
            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    //className="form-control is-valid"                               
                    className={ `form-control ${ !titleValid && 'is-invalid'} `}    
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }                     
                    onChange={ handleInputChange }      
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>
            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ notes }                     
                    onChange={ handleInputChange }      
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>
            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>
        </form>
        {/* Termino contenido Modal */}
    </Modal>
  )
}
