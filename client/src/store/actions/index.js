
import {
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT
} from '../types';



/// USERS

export const authenticateUser = (user) =>({
    type: AUTH_USER,
    payload: user
})


export const userSignOut = () => ({
    type:SIGN_OUT
})


/// PRODUCT
export const productsBySold = (data) => ({
    type: GET_PRODUCTS_BY_SOLD,
    payload: data
})


export const productsByDate = (data) => ({
    type: GET_PRODUCTS_BY_DATE,
    payload: data
})

/// NOTIFICATIONS

export const errorGlobal = (msg) => ({
    type:ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type:SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type:CLEAR_NOTIFICATION
        })
    }
}