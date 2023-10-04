/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsById } from 'store/actions/products.action'
import { Loader } from 'utils/tools'
import { useParams } from 'react-router-dom'
import { clearCurrentProduct } from 'store/actions'
import ProductInfo from './detail'
const Product = (props) => {
    const { id } = useParams()
    const products = useSelector((state) => state.products)
    console.log('products', products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(productsById(id))
    }, [dispatch, id])

    useEffect(() => {
        return () => {
            dispatch(clearCurrentProduct())
        }
    }, [dispatch])
    return (
        <div className="page_container">
            <div className="page_top">
                <div className="container">Product Detail</div>
            </div>
            <div className="container">
                {products && products.productById ? (
                    <div className="product_detail_wrapper">
                        <div className="left">
                            <div style={{ width: '500px' }}></div>
                        </div>
                        <div className="right">
                            <ProductInfo detail={products.productById} />
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    )
}

export default Product
