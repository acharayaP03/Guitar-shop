import React, {useState, useEffect, useReducer} from "react";
import { useDispatch, useSelector} from "react-redux";

import DashboardLayouts from "hoc/dashboard.layouts";
import {getProductByPaginate} from "../../../store/actions/products.action";
import ProductTable from "./productTable";

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
        <DashboardLayouts title="Products">
           <div className="products_table">
               <div>
                   Search bar
               </div>
               <hr/>
               <ProductTable products={products.byPaginate}/>
           </div>
        </DashboardLayouts>
    )
}


export default AdminProducts;