import axios from "axios";
import * as actions from './index'


export const productsBySort = ({ limit, sortBy, order, where}) =>{
    return async (dispatch) =>{
        try{
            const product = await axios.get('/api/products/al',{
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