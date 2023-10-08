/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import DashboardLayouts from 'hoc/dashboard.layouts'
import { Loader } from 'utils/tools'
import CartDetails from './cartDetails'
import { useDispatch, useSelector } from 'react-redux'

const UserCart = (props) => {
    const [loading, setLoading] = useState(false)
    const notifications = useSelector((state) => state.notifications);
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    console.log('users state: ', users)
    const removeItems = (itemId) => {
        console.log(itemId)
    }
    return (
        <DashboardLayouts title="Your Cart">
            {users.cart && users.cart.length > 0 ? (
                <>
                    <CartDetails
                        products={users.cart}
                        removeItems={(id) => removeItems(id)}
                    />
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
