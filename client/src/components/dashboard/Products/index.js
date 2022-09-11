import React, {useState, useEffect, useReducer} from "react";
import { useDispatch, useSelector} from "react-redux";

import DashboardLayouts from "hoc/dashboard.layouts";
import {getProductByPaginate} from "../../../store/actions/products.action";
import ProductTable from "./productTable";
import {useNavigate} from "react-router-dom";
import { removeProduct } from "../../../store/actions/products.action";

const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 5000,
    frets: [],
    page: 1
}

const AdminProducts = (props) => {

    const [removeModal, setRemoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null);

    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notification);
    const navigation = useNavigate()
    const dispatch = useDispatch();

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ( {...state, ...newState}),
        defaultValues
    )

    const gotoEdit = (id) => {
        navigation(`/dashboard/admin/edit_product/${id}`, { replace: true})
    }

    const gotoPage = (page) => {
        setSearchValues({ page });
    }

    const handleClose = () => {
        setRemoveModal(false);
    }

    // removes the element form dom
    const handleModal = (id) =>{
        setToRemove(id);
        setRemoveModal(true);
    }

    const handleRemove = () =>{
        dispatch(removeProduct(toRemove));
    }



    useEffect(() =>{
        dispatch((getProductByPaginate(searchValues)))
    },[dispatch, searchValues]);

    useEffect(() => {
        handleClose();
        setRemoveModal(null);
        if(notifications && notifications.remove_product){
            dispatch(getProductByPaginate(searchValues))
        }
    }, [dispatch, notifications]);

    return(
        <DashboardLayouts title="Products">
           <div className="products_table">
               <div>
                   Search bar
               </div>
               <hr/>
               <ProductTable
                   products={products.byPaginate}
                   prev={(page)=> gotoPage(page)}
                   next={(page)=> gotoPage(page)}
                   gotoEdit={(id)=> gotoEdit(id)}
                   removeModal={removeModal}
                   handleClose={()=> handleClose()}
                   handleModal={(id)=> handleModal(id)}
                   handleRemove={()=> handleRemove()}
               />
           </div>
        </DashboardLayouts>
    )
}


export default AdminProducts;