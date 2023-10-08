/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import DashboardLayouts from 'hoc/dashboard.layouts'
import { Loader } from 'utils/tools'
import CartDetails from './cartDetails'
import { useDispatch, useSelector } from 'react-redux'
import { userRemoveFromCart} from "store/actions/user.action";

const UserCart = (props) => {
    const [loading, setLoading] = useState(false)
    const notifications = useSelector((state) => state.notifications);
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    const removeItems = (position) => {
        dispatch(userRemoveFromCart(position))
    }

    const calculateTotal = () => {
        let total = 0;
        users.cart.forEach((item) => {
            total += parseInt(item.price, 10)
        })
        return total
    }
    return (
        <DashboardLayouts title="Your Cart">
            {users.cart && users.cart.length > 0 ? (
                <>
                    <CartDetails
                        products={users.cart}
                        removeItems={(position) => removeItems(position)}
                    />

                    <div className="user_cart_sum">

                        <div>
                            Total amount: ${calculateTotal()}
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    You dont have any items in your cart. please add some items.
                </div>
            )}
        </DashboardLayouts>
    )
}

export default UserCart
