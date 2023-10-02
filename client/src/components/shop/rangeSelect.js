/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { errorHelper } from 'utils/tools'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons'
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    TextField,
    Button,
} from '@material-ui/core'

const RangeSelect = ({ initState, title, handleRange }) => {
    const [open, setOpen] = useState(initState)

    const formik = useFormik({
        initialValues: { min: 0, max: 5000 },
        validationSchema: Yup.object({
            min: Yup.number().min(0, 'The minimum value is 0'),
            max: Yup.number().max(100000, 'The maximum value is 100000'),
        }),
        onSubmit: (values) => {
            handleRange([values.min, values.max])
        },
    })

    const handleCollapseOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                <ListItem
                    onClick={() => handleCollapseOpen()}
                    style={{ padding: '10px 23px 10px 0' }}
                >
                    <ListItemText primary={title} className="collapse_title" />
                    {open ? <ArrowDropUp /> : <ArrowDropDown />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div>
                                <TextField
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="$ min"
                                    name="min"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('min')}
                                    {...errorHelper(formik, 'min')}
                                />
                            </div>

                            <div>
                                <TextField
                                    className="mt-3"
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="$ max"
                                    name="max"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('max')}
                                    {...errorHelper(formik, 'max')}
                                />
                            </div>
                            <Button
                                type="Submit"
                                text="Apply"
                                className="mt-3"
                                color="secondary"
                                variant="outlined"
                                size="small"
                            >
                                Search
                            </Button>
                        </form>
                    </List>
                </Collapse>
            </List>
        </>
    )
}

export default RangeSelect
