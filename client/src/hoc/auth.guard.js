import React,{ useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import {Loader} from 'utils/tools';
import { useNavigate} from "react-router-dom";


/**
 *
 * @param ComposedComponent wrop the component that needs to be guarded
 * @returns {(function(*): *)|*}
 * checks if the user is logged in to access the dashboard.
 */

export default function authGuard(ComposedComponent){
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