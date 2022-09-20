import React, { useState } from "react";
import {Form, Button, Row, Figure} from "react-bootstrap";

import { useFormik} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { getTokenCookie } from "utils/tools";
import {Loader, renderCardImage } from "utils/tools";


const UploadImage = (props) => {
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
                        <Form.Group as={Row}>

                            {/*<Figure.Image*/}
                            {/*    width={171}*/}
                            {/*    height={180}*/}
                            {/*    alt="171x180"*/}
                            {/*    src={renderCardImage(props)}*/}
                            {/*    onChange={(event)=>{*/}
                            {/*        console.log(event)*/}
                            {/*        //formik.setFieldValue("image", event.target.files[0])*/}
                            {/*    }}*/}
                            {/*    style={{*/}
                            {/*        width: '20%'*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <Form.Control
                                id="file"
                                name="file"
                                type="file"
                                onChange={(event)=>{
                                    console.log(event)
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