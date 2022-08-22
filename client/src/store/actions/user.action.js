import * as actions from './index';
import axios from "axios";


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