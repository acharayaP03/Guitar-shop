import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import AuthForm from "./authForm";

const RegisterLogin = (props) =>{
    const [formType, setFormType ] = useState(false)

    const toggleFormType = () =>{
        setFormType(!formType)
    }
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        { formType ?
                            <>
                                <h1>Register</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid blanditiis distinctio exercitationem,
                                    facere fuga impedit inventore libero necessitatibus nulla optio porro quae quam rem rerum sapiente sed tempore vero voluptates.
                                    Animi dignissimos est, facilis nemo obcaecati porro praesentium sed vel.</p>
                            </>
                            :
                            <>
                                <h1>Welcome back</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem blanditiis, dicta dolorem eos fugiat laudantium nihil nostrum rem soluta?</p>
                            </>
                        }

                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            onClick={ () => toggleFormType()}
                        >
                            {
                                formType ?
                                    "Already registered"
                                    : "Need to register"
                            }
                        </Button>
                    </div>
                    <div className="right">
                        <h2>{ formType ? 'Register': 'Sign in'}</h2>
                        <AuthForm
                            formType={formType}
                            { ...props }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLogin;