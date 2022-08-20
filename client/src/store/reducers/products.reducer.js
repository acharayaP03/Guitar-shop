import  { GET_PRODUCTS_BY_DATE, GET_PRODUCTS_BY_SOLD} from '../types';

export default function productsReducer(state={}, action ){
    switch (action.type){
        case GET_PRODUCTS_BY_SOLD:
            return { ...state, bySold: action.payload };
        case GET_PRODUCTS_BY_DATE:
            return { ...state, byDate: action.payload };
        default:
            return state
    }
}