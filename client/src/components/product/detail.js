/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { WavesButton } from 'utils/tools'

import {
    LocalShipping,
    DoneOutline,
    SentimentDissatisfiedOutlined,
} from '@material-ui/icons'

import { useSelector, useDispatch } from 'react-redux'

const showProdTags = (detail) => (
    <div className="product_tags">
        <div className="tag">
            <div>
                <LocalShipping />
            </div>
            <div className="tag_text">
                {detail.shipping ? (
                    <div>Free shipping for Australian location</div>
                ) : (
                    <div>No free shipping for this item</div>
                )}
            </div>
        </div>
        {detail.available > 0 ? (
            <div className="tag">
                <div>
                    <DoneOutline />
                </div>
                <div className="tag_text">
                    <div>
                        <strong>{detail.available}</strong> items in stock
                    </div>
                </div>
            </div>
        ) : null}
    </div>
)
const ProductInfo = (props) => {
    const detail = props.detail
    return (
        <div className="">
            <h1>
                {detail.brand.name} {detail.model}
            </h1>
            <p>{detail.description}</p>
            {showProdTags(detail)}
        </div>
    )
}

export default ProductInfo
