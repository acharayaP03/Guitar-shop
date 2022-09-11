import axios from "axios";
import * as actions from './index'
import {getAuthHeader} from "../../utils/tools";



export const productsBySort = ({ limit, sortBy, order, where}) =>{
    return async (dispatch) =>{
        try{
            const product = await axios.get('/api/products/all',{
                params:{
                    limit,
                    sortBy,
                    order
                }
            });
            //
            // console.log(product)
            switch (where) {
                case 'bySold':
                    dispatch(actions.productsBySold(product.data));
                    break;
                case 'byDate':
                    dispatch(actions.productsByDate(product.data));
                    break;
                default:
                    return false;
            }
        }catch (error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}


export const getProductByPaginate = (args) => {
    return async (dispatch) =>{
        try{
            const product = await axios.post(`/api/products/paginate/all`, args)
            dispatch(actions.getProductsByPaginate(product.data))
        }catch (error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const removeProduct = (id) => {
    return async(dispatch) =>{
        try{
          await axios.delete(`/api/products/product/${id}`, getAuthHeader());
          dispatch(actions.removeProduct());
          dispatch(actions.successGlobal())
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const addProduct = (product) => {
    return async(dispatch) =>{
        try{
            const newProduct = await axios.post(`/api/products`, product, getAuthHeader());
            dispatch(actions.addProduct(newProduct.data));
            dispatch(actions.successGlobal())
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}