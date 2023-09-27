import {ADD_PRODUCT, GET_PRODUCT_BY_PAGINATE, GET_PRODUCTS_BY_DATE, GET_PRODUCTS_BY_SOLD, CLEAR_PRODUCT_ADD, GET_PRODUCT_BY_ID} from '../types';

export default function productsReducer(state={}, action ){
    switch (action.type){
        case GET_PRODUCTS_BY_SOLD:
            return { ...state, bySold: action.payload };
        case GET_PRODUCTS_BY_DATE:
            return { ...state, byDate: action.payload };
        case GET_PRODUCT_BY_PAGINATE:
            return { ...state, byPaginate: action.payload}
        case ADD_PRODUCT:
            return { ...state, lastAdded: action.payload}
        case CLEAR_PRODUCT_ADD:
            return {...state, lastAdded:null }
        case GET_PRODUCT_BY_ID:
            return { ...state, productById: action.payload}
        default:
            return state
    }
}