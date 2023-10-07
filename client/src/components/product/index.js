/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsById } from 'store/actions/products.action'
import { Loader } from 'utils/tools'
import { useParams } from 'react-router-dom'
import { clearCurrentProduct } from 'store/actions'
import ProductInfo from './detail'
import { renderCardImage } from 'utils/tools'

import { Modal } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Product = (props) => {
    const [modal, setModal] = useState(false)
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const handleCloseModal = () => setModal(false)
    const handleOpenModal = () => setModal(true)

    const { id } = useParams()
    const products = useSelector((state) => state.products)
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
                            <div>
                                <img
                                    alt={products.productById.name}
                                    src={renderCardImage(
                                        products.productById.images
                                    )}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleOpenModal()}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <ProductInfo detail={products.productById} />
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
            <Modal
                show={modal}
                onHide={handleCloseModal}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton style={{ background: 'white' }}>
                    <Modal.Title>Product Images</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: 'gray' }}>
                    <Slider {...settings}>
                        {products.productById && products.productById.images
                            ? products.productById.images.map((item, i) => (
                                  <div key={item} style={{ margin: '0 auto' }}>
                                      <div className="img-block">
                                          <img
                                              src={item}
                                              alt={item}
                                              style={{
                                                  objectFit: 'contain',
                                                  width: 'auto',
                                              }}
                                          />
                                      </div>
                                  </div>
                              ))
                            : null}
                    </Slider>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Product
