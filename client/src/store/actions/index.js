
import {
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE, CHANGE_USER_EMAIL, GET_PRODUCT_BY_PAGINATE,
    REMOVE_PRODUCT
} from '../types';



/// USERS

export const authenticateUser = (user) =>({
    type: AUTH_USER,
    payload: user
})


export const userSignOut = () => ({
    type:SIGN_OUT
})

export const updateUserProfile = (userData) =>({
    type: UPDATE_USER_PROFILE,
    payload: userData
})


export const changeUserEmail = (data) => ({
    type:CHANGE_USER_EMAIL,
    payload:data
})


/// PRODUCT
export const productsBySold = (data) => ({
    type: GET_PRODUCTS_BY_SOLD,
    payload: data
})


export const productsByDate = (data) => ({
    type: GET_PRODUCTS_BY_DATE,
    payload: data
});

export const getProductsByPaginate = (products) =>({
    type: GET_PRODUCT_BY_PAGINATE,
    payload: products
})

export const removeProduct = () => ({
    type:REMOVE_PRODUCT
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