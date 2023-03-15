
//  solo para tener un objeto para tener centralizado todos los tipos de mis acciones para no escribirlos como string 

export const types = {

    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    eventStartAddNew: '[event] Start add new',
    eventAddNew: '[event] Add new',
    eventSetActive: '[event] Set Active',

    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',

    eventLoaded: '[event] Events loaded',
    

    //eventUpdateInitEvent: '[event] Event update initEvent'
 
    authChekingFinish: '[auth] Finish cheking login state', 
    authStartLogin: '[auth] Start login', 
    authLogin: '[auth] Login', 
    authRegister: '[auth] Register', 
    authStartRegister: '[auth] Start register', 
    authStartTokenRenew: '[auth] Start token renew', 
    authLogout: '[auth] Logout', 


}