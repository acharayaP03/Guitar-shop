import React from "react";
import DashboardLayouts from "hoc/dashboard.layouts";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper} from "utils/tools";

import { useDispatch} from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { updateUserProfile } from "store/actions/user.action";

const UserInfo = ({ users }) =>{
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            firstname: users.data.firstname,
            lastname: users.data.lastname,
        },
        validationSchema:Yup.object({
            firstname: Yup.string()
                .min(3,'3 char min')
                .max(30,'30 char max')
                .required('Sorry, you need the firstname'),
            lastname:Yup.string()
                .min(3,'3 char min')
                .max(30,'30 char max')
                .required('Sorry, you need the lastname'),
        }),
        onSubmit:(values)=>{
            dispatch(updateUserProfile(values))
        }
    });

    return(
        <DashboardLayouts title="User Information">
            <form className="mt-3 article_form" style={{maxWidth:'500px'}}
                  onSubmit={formik.handleSubmit}
            >
                <div className="form-group">
                    <TextField
                        style={{ width:'100%'}}
                        name="firstname"
                        label="Enter your firstname"
                        variant="outlined"
                        {...formik.getFieldProps('firstname')}
                        {...errorHelper(formik,'firstname')}
                    />
                </div>
                <div className="form-group mt-5">
                    <TextField
                        style={{ width:'100%'}}
                        name="lastname"
                        label="Enter your lastname"
                        variant="outlined"
                        {...formik.getFieldProps('lastname')}
                        {...errorHelper(formik,'lastname')}
                    />
                </div>
                <Button
                    className="mb-3 mt-5"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Edit profile
                </Button>
            </form>
        </DashboardLayouts>
    )
}

export default UserInfo;


