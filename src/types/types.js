
//  solo para tener un objeto para tener centralizado todos los tipos de mis acciones para no escribirlos como string 

export const types = {

    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    eventAddNew: '[event] Add new',
    eventSetActive: '[event] Set Active',

    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',

    //eventUpdateInitEvent: '[event] Event update initEvent'

    authCheking: '[auth] Cheking login state', 
    authChekingFinish: '[auth] Finish cheking login state', 
    authStartLogin: '[auth] Start login', 
    authLogin: '[auth] Login', 
    authStartRegister: '[auth] Start register', 
    authStartTokenRenew: '[auth] Start token renew', 
    authLogout: '[auth] Logout', 


}