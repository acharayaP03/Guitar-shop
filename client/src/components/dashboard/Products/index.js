import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProductByPaginate,
    removeProduct,
} from 'store/actions/products.action';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';

import { TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import DashboardLayouts from 'hoc/dashboard.layouts';
import ProductTable from './productTable';

const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 5000,
    frets: [],
    page: 1,
};

const AdminProducts = (props) => {
    const [removeModal, setRemoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null);

    const products = useSelector((state) => state.products);
    const notifications = useSelector((state) => state.notification);
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    );

    const formik = useFormik({
        initialValues: { keywords: '' },
        validationSchema: Yup.object({
            keywords: Yup.string()
                .min(
                    3,
                    'at least 3 letters are required to perform your related search.'
                )
                .max(200, 'Your search is too long.'),
        }),
        onSubmit: (values, { resetForm }) => {
            setSearchValues({ keywords: values.keywords, page: 1 });
            resetForm();
        },
    });

    const resetSearch = () => {
        setSearchValues(defaultValues);
    };

    const gotoEdit = (id) => {
        navigation(`/dashboard/admin/edit_product/${id}`, { replace: true });
    };

    const gotoPage = (page) => {
        setSearchValues({ page: page });
    };

    const handleClose = () => {
        setRemoveModal(false);
    };

    // removes the element form dom
    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true);
    };

    const handleRemove = () => {
        dispatch(removeProduct(toRemove));
    };

    useEffect(() => {
        dispatch(getProductByPaginate(searchValues));
    }, [dispatch, searchValues]);

    useEffect(() => {
        handleClose();
        console.log('Search values: ', searchValues);
        setRemoveModal(null);
        if (notifications && notifications.remove_product) {
            dispatch(getProductByPaginate(searchValues));
        }
    }, [dispatch, notifications, searchValues]);

    return (
        <DashboardLayouts title="Products">
            <div className="products_table">
                <div>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{ width: '100%' }}
                            name="keywords"
                            label="Enter your search"
                            variant="outlined"
                            {...formik.getFieldProps('keywords')}
                            {...errorHelper(formik, 'keywords')}
                        />
                    </form>
                    <Button onClick={() => resetSearch()}>Reset search</Button>
                </div>
                <hr />
                <ProductTable
                    products={products.byPaginate}
                    prev={(page) => gotoPage(page)}
                    next={(page) => gotoPage(page)}
                    gotoEdit={(id) => gotoEdit(id)}
                    removeModal={removeModal}
                    handleClose={() => handleClose()}
                    handleModal={(id) => handleModal(id)}
                    handleRemove={() => handleRemove()}
                />
            </div>
        </DashboardLayouts>
    );
};

export default AdminProducts;
