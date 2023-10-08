
import React, { useState } from 'react'
import { WavesButton } from 'utils/tools'
import {
    LocalShipping,
    DoneOutline,
    SentimentDissatisfiedOutlined,
} from '@material-ui/icons'
import AddToCartHandler from 'utils/addToCartHandler'
import { useSelector, useDispatch } from 'react-redux'
import { userAddToCart } from 'store/actions/user.action'
const freeShipping = (detail) => {
    return detail.shipping ? (
        <div>Free shipping for Australian location</div>
    ) : (
        <div>No free shipping for this item</div>
    )
}

const showAvailableProduct = (detail) => {
    return detail.available > 0 ? (
        <div className="tag">
            <div>
                <DoneOutline />
            </div>
            <div className="tag_text">
                <div>
                    <strong>{detail.available}</strong> products in warehouse
                </div>
            </div>
        </div>
    ) : (
        <div className="tag">
            <div>
                <SentimentDissatisfiedOutlined />
            </div>
            <div className="tag_text">
                <div>
                    Sorry product is out of stock. Please contact us for more
                    information.
                </div>
            </div>
        </div>
    )
}

const showProductSpecifications = (detail) => {
    return (
        <div className="product_specifications">
            <h2>Specs:</h2>
            <div>
                <div className="item">
                    <strong>Frets:</strong> {detail.frets}
                </div>
                <div className="item">
                    <strong>Wood:</strong> {detail.woodtype}
                </div>
            </div>
        </div>
    )
}

const showProdTags = (detail) => (
    <div className="product_tags">
        <div className="tag">
            <div>
                <LocalShipping />
            </div>
            <div className="tag_text">
                <div>{freeShipping(detail)}</div>
            </div>
        </div>
        {showAvailableProduct(detail)}
    </div>
)
const ProductInfo = (props) => {
    const user = useSelector((state) => state.users)
    const [modal, setModal] = useState(false)
    const [errorType, setErrorType] = useState(null)
    const dispatch = useDispatch()

    const handleClose = () => setModal(false)

    const handleAction = (item) => {
        if (!user.auth) {
            setModal(true)
            setErrorType('auth')
            return false
        }
        if (!user.data.varified) {
            setModal(true)
            setErrorType('verify')
            return false
        }
        dispatch(userAddToCart(item))
    }

    const detail = props.detail
    return (
        <div className="">
            <h1>
                {detail.brand.name} {detail.model}
            </h1>
            <p>{detail.description}</p>
            {showProdTags(detail)}
            <div className="product_actions">
                <div className="price">$ {detail.price}</div>
                <div className="cart">
                    <WavesButton
                        type="add_to_cart_link"
                        runAction={() => handleAction(detail)}
                    />
                </div>
            </div>
            {showProductSpecifications(detail)}

            <AddToCartHandler
                modal={modal}
                errorType={errorType}
                handleClose={handleClose}
            />
        </div>
    )
}

export default ProductInfo
