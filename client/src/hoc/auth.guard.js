import React,{ useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import {Loader} from 'utils/tools';
import {Navigate, useNavigate} from "react-router-dom";


/**
 *
 * @param ComposedComponent wrop the component that needs to be guarded
 * @returns {(function(*): *)|*}
 * checks if the user is logged in to access the dashboard.
 */

export const AuthGuard = (ComposedComponent) =>{

    const AuthenticationCheck = (props) => {

        const [isAuth,setIsAuth] = useState(false);
        const users  = useSelector( state => state.users );
        const navigation = useNavigate()

        useEffect(()=>{
            if(!users.auth){
                navigation('/', { replace: false})
            }else{
                setIsAuth(true);
            }
        },[props,users]);


        if(!isAuth){
            return(
                <Loader full={true}/>
            )
        } else {
            return(
                <ComposedComponent users={users} {...props}/>
            )
        }
    }
    return AuthenticationCheck;
}

/**
 * prevent user to enter sign in page when they are already authenticated
 */

export const PreventSignInRoute = (props) =>{
    const users  = useSelector( state => state.users );
    return (
        <>
            {
                users.auth ?
                    <Navigate to="/dashboard" replace={true} />
                    :
                    props.children
            }
        </>
    )
}