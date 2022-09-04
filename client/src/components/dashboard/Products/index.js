import React, {useState, useEffect, useReducer} from "react";
import { useDispatch, useSelector} from "react-redux";

import DashboardLayouts from "hoc/dashboard.layouts";
import {getProductByPaginate} from "../../../store/actions/products.action";

const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 5000,
    frets: [],
    page: 1
}

const AdminProducts = (props) => {

    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notification);
    const dispatch = useDispatch();

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ( {...state, ...newState}),
        defaultValues
    )


    useEffect(() =>{
        dispatch((getProductByPaginate(searchValues)))
    },[dispatch, searchValues])

    return(
        <DashboardLayouts>
            return something here...
        </DashboardLayouts>
    )
}


export default AdminProducts;