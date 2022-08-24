import * as actions from './index';
import axios from "axios";
import { getTokenCookie, removeTokenCookie, getAuthHeader } from "../../utils/tools";

/**
 *
 * set default header when we are doing post request
 */
axios.defaults.headers.post['Content-Type'] = 'application/json';

export  const userRegister = (values) =>{
    return async (dispatch) =>{
        try{
            const user = await axios.post(`/api/auth/register`, {
                email: values.email,
                password: values.password
            });


            dispatch(actions.authenticateUser({
                data: user.data.user,
                auth: true
            }));

            // show success message
            dispatch(actions.successGlobal('Welcome!, please check you mail and verify your account'))

        }catch (error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userSignIn = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/auth/signin`,{
                email:values.email,
                password:values.password
            });
            dispatch(actions.authenticateUser({data: user.data.user,auth: true}))
            dispatch(actions.successGlobal('Welcome!!'))
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))

        }
    }
}

export const userIsAuthenticated = () => {
    return async (dispatch)=>{
        try {
            if(!getTokenCookie()){
                throw new Error();
            }
            console.log('its working')
        }catch (error){
            dispatch(actions.authenticateUser({ data:{}, auth: false}))
        }
    }
}