import React, { useEffect, useState } from 'react'
import DashbordLayouts from 'hoc/dashboard.layouts'
import UploadImage from './uploadImage'
import { useFormik } from 'formik'
import { validation } from './formvalues'
import { errorHelper, Loader } from 'utils/tools'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrands } from 'store/actions/brands.actions'

import {
    TextField,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
} from '@material-ui/core'
import { addProduct } from '../../../store/actions/products.action'
import ImageViewer from './imageViewer'

const AddProduct = () => {
    const [loading, setLoading] = useState(false)
    const notifications = useSelector((state) => state.notification)
    const brands = useSelector((state) => state.brands)
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const formik = useFormik({
        initialValues: {
            model: '',
            brand: '',
            frets: '',
            woodtype: '',
            description: '',
            price: '',
            available: '',
            shipping: false,
            images: [],
        },
        validationSchema: validation,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    })

    const handleSubmit = (data) => {
        setLoading(true)
        dispatch(addProduct(data))
    }

    const deleteImage = (index) => {
        const imageArray = formik.values.images
        imageArray.splice(index, 1)
        formik.setFieldValue('images', imageArray)
    }

    const handlePicValue = (pic) => {
        const picArray = formik.values.images
        picArray.push(pic.url)
        formik.setFieldValue('images', picArray)
    }

    useEffect(() => {
        if (notifications && notifications.success) {
            setLoading(false)
            navigation('/dashboard/admin/admin_products', { replace: true })
        }
        if (notifications && notifications.error) {
            setLoading(false)
        }
    }, [notifications, navigation])

    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])

    return (
        <DashbordLayouts title="Add Product">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <ImageViewer
                        formik={formik}
                        deleteImage={(index) => deleteImage(index)}
                    />
                    <UploadImage picValue={(pic) => handlePicValue(pic)} />
                    <Divider className="mt-3 mb-3" />

                    <form
                        className="mt-3 article_form"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="model"
                                label="Enter your model"
                                variant="outlined"
                                {...formik.getFieldProps('model')}
                                {...errorHelper(formik, 'model')}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <TextField
                                style={{ width: '100%' }}
                                name="frets"
                                label="Enter the amount of frets"
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('frets')}
                                {...errorHelper(formik, 'frets')}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <TextField
                                style={{ width: '100%' }}
                                name="woodtype"
                                label="Enter the woodtype"
                                variant="outlined"
                                {...formik.getFieldProps('woodtype')}
                                {...errorHelper(formik, 'woodtype')}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <FormControl variant="outlined">
                                <h5>Select a brand</h5>
                                <Select
                                    name="brand"
                                    {...formik.getFieldProps('brand')}
                                    error={
                                        formik.errors.brand &&
                                        formik.touched.brand
                                            ? true
                                            : false
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {brands && brands.all
                                        ? brands.all.map((item) => (
                                              <MenuItem
                                                  key={item._id}
                                                  value={item._id}
                                              >
                                                  {item.name}
                                              </MenuItem>
                                          ))
                                        : null}
                                </Select>
                                {formik.errors.brand && formik.touched.brand ? (
                                    <FormHelperText error={true}>
                                        {formik.error.brand}
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                        </div>

                        <div className="form-group mt-3">
                            <TextField
                                style={{ width: '100%' }}
                                name="description"
                                label="Enter the description"
                                variant="outlined"
                                {...formik.getFieldProps('description')}
                                {...errorHelper(formik, 'description')}
                                multiline
                                minRows="4"
                            />
                        </div>

                        <div className="form-group mt-3">
                            <TextField
                                style={{ width: '100%' }}
                                name="price"
                                label="Enter the price"
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('price')}
                                {...errorHelper(formik, 'price')}
                            />
                        </div>

                        <Divider className="mt-3 mb-3" />

                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="available"
                                label="How many of this do we have on storage ?"
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('available')}
                                {...errorHelper(formik, 'available')}
                            />
                        </div>

                        <Divider className="mt-3 mb-3" />

                        <div className="form-group">
                            <FormControl variant="outlined">
                                <h5>Do we offer free shipping</h5>
                                <Select
                                    name="shipping"
                                    {...formik.getFieldProps('shipping')}
                                    error={
                                        formik.errors.shipping &&
                                        formik.touched.shipping
                                            ? true
                                            : false
                                    }
                                >
                                    <MenuItem value={true}> Yes </MenuItem>
                                    <MenuItem value={false}> No </MenuItem>
                                </Select>
                                {formik.errors.shipping &&
                                formik.touched.shipping ? (
                                    <FormHelperText error={true}>
                                        {formik.error.shipping}
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                        </div>

                        <Divider className="mt-3 mb-3" />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add product
                        </Button>
                    </form>
                </>
            )}
        </DashbordLayouts>
    )
}

export default AddProduct
