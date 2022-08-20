import {
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION

} from '../types';

export default function notificationsReducer(state={},action){
    switch(action.type){
        case ERROR_GLOBAL:
            return {...state, error: true, msg: action.payload}
        case SUCCESS_GLOBAL:
            return {...state, success: true, msg: action.payload}
        case CLEAR_NOTIFICATION:
            // clear all notification state if no error or once the error is shown.
            return {}
        default:
            return state
    }
}