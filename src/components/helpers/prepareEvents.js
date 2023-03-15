import moment from "moment";

export const prepareEvents = ( events =[] ) => {    // tengo que regresar los eventos transformados de alguna manera, se puede igualar a un [] para tener ayuda

    return events.map(
        (element) => ({
            ...element,
            end: moment( element.end ).toDate(), 
            start: moment( element.start ).toDate(), 
        })
    )
}