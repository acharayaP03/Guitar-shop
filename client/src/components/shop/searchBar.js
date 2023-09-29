import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { errorHelper } from 'utils/tools'
import { TextField } from '@material-ui/core'

const SearchBar = ({ handleKeywords }) => {
    const formik = useFormik({
        initialValues: { keywords: '' },
        validationSchema: Yup.object({
            keywords: Yup.string()
                .min(3, 'You need more than 3')
                .max(200, 'You need less than 200'),
        }),
        onSubmit: (values, { resetForm }) => {
            handleKeywords(values.keywords)
            resetForm()
        },
    })
    return (
        <div className="container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <TextField
                    style={{
                        width: '100%',
                    }}
                    name="keywords"
                    label="Search for products"
                    variant="outlined"
                    {...formik.getFieldProps('keywords')}
                    {...errorHelper(formik, 'keywords')}
                />
            </form>
        </div>
    )
}

export default SearchBar
