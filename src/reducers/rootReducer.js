import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { calendarReducer } from "./calendarReducer";
import { authReducer } from "./authReducer";



export const rootReducer = combineReducers({     // recibe como argumento un objeto que muestra como lucira el store
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})

