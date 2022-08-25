import * as actions from './index';
import axios from "axios";
import { getTokenCookie, removeTokenCookie, getAuthHeader } from "../../utils/tools";
import {SIGN_OUT} from "../types";

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

            const user = await axios.get('/api/auth/isauthenticated', getAuthHeader());
            dispatch(actions.authenticateUser({ data: user.data, auth: true}))
        }catch (error){
            dispatch(actions.authenticateUser({ data:{}, auth: false}))
        }
    }
}

export const userSignOut = () => {
    return async (dispatch) =>{
        removeTokenCookie();
        dispatch(actions.userSignOut());
        dispatch(actions.successGlobal('Thanks for visiting Guitar shop.'))

    }
}

export const updateUserProfile = (record) =>{
    return async (dispatch, getState) =>{
        try{
            // 1.) get the profile for the user
            const profile = await axios.patch(`/api/users/profile`, {
                record
            }, getAuthHeader());

            // 2.) send data to the server
            const userData ={
                ...getState().users.data,
                firstname: profile.data.firstname,
                lastname: profile.data.lastname
            }
            console.log(userData)
            dispatch(actions.updateUserProfile(userData));
            dispatch(actions.successGlobal('Profile has been updated...'))
        }catch (error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}