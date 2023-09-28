import {
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    CHANGE_USER_EMAIL,
    GET_PRODUCT_BY_PAGINATE,
    REMOVE_PRODUCT,
    GET_ALL_BRANDS,
    ADD_PRODUCT,
    GET_PRODUCT_BY_ID,
    CLEAR_CURRENT_PRODUCT,
} from '../types';

/// USERS

export const authenticateUser = (user) => ({
    type: AUTH_USER,
    payload: user,
});

export const userSignOut = () => ({
    type: SIGN_OUT,
});

export const updateUserProfile = (userData) => ({
    type: UPDATE_USER_PROFILE,
    payload: userData,
});

export const changeUserEmail = (data) => ({
    type: CHANGE_USER_EMAIL,
    payload: data,
});

/// PRODUCT
export const productsBySold = (data) => ({
    type: GET_PRODUCTS_BY_SOLD,
    payload: data,
});

export const productsByDate = (data) => ({
    type: GET_PRODUCTS_BY_DATE,
    payload: data,
});

export const getProductsByPaginate = (products) => ({
    type: GET_PRODUCT_BY_PAGINATE,
    payload: products,
});

export const removeProduct = () => ({
    type: REMOVE_PRODUCT,
});

export const getAllBrands = (brands) => ({
    type: GET_ALL_BRANDS,
    payload: brands,
});

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product,
});

export const productById = (product) => ({
    type: GET_PRODUCT_BY_ID,
    payload: product,
});

/// NOTIFICATIONS

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg,
});

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg,
});

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION,
        });
    };
};

export const clearCurrentProduct = () => ({
    type: CLEAR_CURRENT_PRODUCT,
    payload: {},
});
