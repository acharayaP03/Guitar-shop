import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";

import {errorHelper, Loader} from "utils/tools";
import {Modal} from 'react-bootstrap';

import { TextField, Button, Stepper, StepLabel, Step} from "@material-ui/core";
import usersReducer from "store/reducers/users.reducer";
import {changeUserEmail} from "store/actions/user.action";


const EmailStepper = ({ users }) =>{
    const [loading, setLoading] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [activeStep, setActiveStep] = useState(0)
    const notification = useSelector(state => state.notification);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email: '', newemail: ''},
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Previous email is required.')
                .email('Please provide valid email.')
                .test('match', 'Please check your email', (email) =>{
                    return email === users.data.email
                }),
            newemail: Yup.string()
                .required('Please provide new email.')
                .email('Please provide valid email.')
                .test('match', 'Please check your email', (newemail) =>{
                    return newemail !== users.data.email
                })
        }),
        onSubmit: (values) =>{
            setLoading(true);
            dispatch(changeUserEmail(values))
        }
    });
    const steps = ['Enter previous email', 'Enter new email', 'Please confirm new email']
    const closeModal = () => setEmailModal(false);
    const openModal = () => setEmailModal(true);

    const handleNext = () => {
        setActiveStep((prevActiveStep)=> prevActiveStep + 1 )
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep)=> prevActiveStep - 1 )
    }

    const nextBtn = () => (
        <Button className="mt-3" variant="contained" color="primary" onClick={handleNext}>
            Next
        </Button>
    )


    const backBtn = () => (
        <Button className="mt-3 ml-2" variant="contained" onClick={handleBack}>
            Back
        </Button>
    )


    useEffect(()=>{
        if( notification && notification.success){
            closeModal();
        }
        setLoading(false);
    },[notification])

    return (
        <>
            <form className="mt-3 article_form" style={{maxWidth:'250px'}}>
                <div className="form-group">
                    <TextField
                        style={{ width:'100%'}}
                        name="emailstatic"
                        variant="outlined"
                        value={users.data.email}
                        disabled
                    />
                </div>
                <Button
                    className="mb-3 mt-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                >
                    Edit email
                </Button>
            </form>
            {/* Boot strap modal*/}
            <Modal size="lg" centered show={emailModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stepper activeStep={activeStep}>
                        {
                            steps.map( ( label, index) => {
                                return(
                                    <Step key={label}>
                                        <StepLabel>{ label }</StepLabel>
                                    </Step>
                                )
                            })
                        }
                    </Stepper>
                    <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                        { activeStep === 0 ?
                            <div className="form-group">
                                <TextField
                                    style={{ width:'100%'}}
                                    name="email"
                                    label="Enter your current email"
                                    variant="outlined"
                                    {...formik.getFieldProps('email')}
                                    {...errorHelper(formik,'email')}
                                />
                                {  formik.values.email && !formik.errors.email ?
                                    nextBtn()
                                    :null
                                }
                            </div>
                            :null}
                            { activeStep === 1 ?
                                <div className="form-group">
                                    <TextField
                                        style={{ width:'100%'}}
                                        name="newemail"
                                        label="Enter your new email"
                                        variant="outlined"
                                        {...formik.getFieldProps('newemail')}
                                        {...errorHelper(formik,'newemail')}
                                    />
                                    {  formik.values.newemail && !formik.errors.newemail ?
                                        nextBtn()
                                        :null
                                    }
                                    { backBtn()}
                                </div>
                                :null}
                            { activeStep === 2 ?
                                <div className="form-group">
                                    { loading ?
                                        <Loader/>
                                        :
                                        <>
                                            <Button
                                                className="mt-3"
                                                variant="contained"
                                                color="primary"
                                                onClick={formik.submitForm}
                                            >
                                                Edit email
                                            </Button>
                                            {backBtn()}
                                        </>
                                    }
                                </div>
                                :null}
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EmailStepper;