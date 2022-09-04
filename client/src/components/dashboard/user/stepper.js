import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";

import {errorHelper, Loader} from "utils/tools";
import {Modal} from 'react-bootstrap';

import { TextField, Button, Stepper, StepLabel} from "@material-ui/core";
import usersReducer from "store/reducers/users.reducer";


const EmailStepper = ({ users }) =>{
    const [loading, setLoading] = useState(false);
    const [emailModal, setEmailModal] = useState(false);

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
            console.log(values)
        }
    });

    const closeModal = () => setEmailModal(false);
    const openModal = () => setEmailModal(true);

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
                    stepper
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EmailStepper;