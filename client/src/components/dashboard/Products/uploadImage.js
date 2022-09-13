import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";

import { useFormik} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { getTokenCookie } from "utils/tools";
import {Loader} from "utils/tools";


const UploadImage = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { image: ''},
        validationSchema: Yup.object({
            image: Yup.mixed().required('Please upload image.')
        }),
        onSubmit: (values) =>{
            setLoading(true);
            let formData = new FormData();
            formData.append('file', values.image);

            axios.post(`/api/products/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getTokenCookie()}`
                }
            }).then( response =>{
                console.log(response.data)
            }).catch(error =>{
                alert(error)
            }).finally(() =>{
                setLoading(false)
            })

        }
    });

    return(
        <>
            {
                loading ?
                    <Loader/>
                    :
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                id="file"
                                name="file"
                                type="file"
                                onChange={(event)=>{
                                    formik.setFieldValue("image", event.target.files[0])
                                }}
                            />
                            { formik.errors.image && formik.touched.image ?
                                <div>Error</div>
                                :null
                            }
                        </Form.Group>
                        <Button variant="secondary" type="submit">
                            Add image
                        </Button>
                    </Form>

            }
        </>
    )
}

export default UploadImage;