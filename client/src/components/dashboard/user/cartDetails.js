/* eslint-disable no-unused-vars */
import React from "react";
import {renderCardImage} from "utils/tools";


const CartDetails = ({ products, removeItems }) => {
    return (

        products ?
            products.map((product, index) => (
                <div className="user_product_block" key={`${product._id}${index}`}>
                    <div className="item">
                        <div className="image"
                             style={{
                                 background: `url(${renderCardImage(product.images)}) no-repeat`
                             }}
                        >
                        </div>
                    </div>
                    <div className="item">
                        <h4>Product name</h4>
                        <div>
                            { product.brand.name} - { product.model}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Product price</h4>
                        <div>
                            ${ Number(product.price).toFixed(2)}
                        </div>
                    </div>
                    <div className="item btn">

                        <div className="cart_remove_btn"
                             onClick={() => alert('remove')}
                        >
                            Remove
                        </div>
                    </div>
                </div>
            ))
            : <div>there you go</div>
    )
}

export  default CartDetails;