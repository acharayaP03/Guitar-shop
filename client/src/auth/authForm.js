import React, {useEffect, useState} from "react";
import { useFormik} from "formik";
import * as Yup from 'yup';
import {Loader, errorHelper } from "../utils/tools";

import { useDispatch, useSelector} from "react-redux";
import { TextField, Button} from "@material-ui/core";
import  { userRegister , userSignIn } from 'store/actions/user.action'

const AuthForm = (props) => {
    const notification = useSelector(state=> state.notification);
    const [loading, setLoading] = useState(false)
    const  dispatch = useDispatch()
    /**
     * use formik to validate our form.
     */

    const formik = useFormik({
        initialValues: { email: '', password: ''},
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry, email is required.')
                .email('Please provide a valid email.'),
            password: Yup.string()
                .required('Sorry, password is required.')
        }),
        onSubmit: (values) => {
            setLoading(true);
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        if(props.formType){
            dispatch(userRegister(values))
        }else {
            dispatch(userSignIn(values))
        }
    }

    /**
     * once the user is successfully registered, we will direct them to dash board.
     */
    useEffect(()=>{
        if(notification && notification.success){
            props.history.push('/dashboard')
        } else{
            setLoading(false);
        }
    },[notification,props.history]);

    return (
        <>
            <div className="auth_container">
                {
                    loading ? <Loader/>
                        :
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <TextField
                                    style={{ width: '100%'}}
                                    name="email"
                                    label="Enter your email"
                                    variant="outlined"
                                    {...formik.getFieldProps('email')}
                                    {...errorHelper(formik, 'email')}
                                />
                            </div>
                                <div className="form-group mt-3">
                                    <TextField
                                        style={{ width: '100%'}}
                                        name="password"
                                        type="password"
                                        label="Enter your password"
                                        variant="outlined"
                                        {...formik.getFieldProps('password')}
                                        {...errorHelper(formik, 'password')}
                                    />
                                </div>
                                <Button
                                    className="mt-3"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    size="small"
                                >
                                    { props.formType ? 'Register':'Login'}
                                </Button>
                        </form>
                }
            </div>
        </>
    )
};

export default AuthForm;