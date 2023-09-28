import React, { useState } from 'react';
import { Form, Button, Row, Figure } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { getTokenCookie } from 'utils/tools';
import { Loader, renderCardImage } from 'utils/tools';

const UploadImage = (props) => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { images: '' },
        validationSchema: Yup.object({
            images: Yup.mixed().required('Please upload image.'),
        }),
        onSubmit: (values) => {
            setLoading(true);
            let formData = new FormData();
            formData.append('file', values.images);

            axios
                .post(`/api/products/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${getTokenCookie()}`,
                    },
                })
                .then((response) => {
                    props.picValue(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
    });

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Control
                            id="file"
                            name="file"
                            type="file"
                            onChange={(event) => {
                                formik.setFieldValue(
                                    'images',
                                    event.target.files[0]
                                );
                            }}
                        />
                        {formik.errors.images && formik.touched.images ? (
                            <div>Error</div>
                        ) : null}
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Add image
                    </Button>
                </Form>
            )}
        </>
    );
};

export default UploadImage;
