import  { GET_PRODUCTS_BY_DATE, GET_PRODUCTS_BY_SOLD} from '../types';

export default function productsReducer(state={}, { type, payload } ){
    switch (type){
        case GET_PRODUCTS_BY_SOLD:
            return { ...state, payload };
        case GET_PRODUCTS_BY_DATE:
            return { ...state, payload };
        default:
            return state
    }
}