import React, {useState} from "react";
import { useFormik} from "formik";
import * as Yup from 'yup';
import {Loader} from "../utils/tools";

import { useDispatch, useSelector} from "react-redux";
import { TextField, Button} from "@material-ui/core";


const AuthForm = (props) => {
    const [loading, setLoading] = useState(false)
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
        onSubmit: (values) => { console.log(values)}
    })

    return (
        <>
            <div className="auth_container">
                {
                    loading ? <Loader/>
                        :
                        <form className="mt-3">
                            <div className="form-group">
                                <TextField
                                    style={{ width: '100%'}}
                                    name="email"
                                    label="Enter your email"
                                    variant="outlined"
                                    {...formik.getFieldProps('email')}
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