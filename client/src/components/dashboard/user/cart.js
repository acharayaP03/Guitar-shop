/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import DashboardLayouts from 'hoc/dashboard.layouts'
import { Loader } from 'utils/tools'
import CartDetails from './cartDetails'
import { useDispatch, useSelector } from 'react-redux'
import { userRemoveFromCart} from "store/actions/user.action";
import { PayPalButton } from "react-paypal-button-v2";

const UserCart = () => {
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

    const generateUnits = () => (
        [{
            description:"Guitars and accessories",
            amount:{
                currency_code:"USD",
                value:calculateTotal(),
                breakdown:{
                    item_total:{
                        currency_code:"USD",
                        value:calculateTotal()
                    }
                }
            },
            items:generateItems()
        }]
    );

    const generateItems = () => {
        let items = users.cart.map((item)=>(
            {
                unit_amount:{
                    currency_code:"USD",
                    value: item.price
                },
                quantity:1,
                name: item.model
            }
        ));
        return items
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

                    {loading ?

                        <Loader />
                        :
                        <div className="pp_button">

                            <PayPalButton
                                options={{
                                    clientId: 'AVu-FCMophbIGZhgUrGeXvp0QdlYfdZvR8t2q8K1VqaHG8iBWMtxDIcRAxDpkWCnfV6ocbD5VFBUSQMW',
                                    currency: 'USD'
                                }}
                                createOrder={ (data, actions) => {
                                    return actions.order.create({
                                        purchase_units: generateUnits()
                                    })
                                }}
                                onSuccess={(details, data) => {
                                    console.log(details)
                                    console.log(data)
                                    setLoading(true)
                                }}
                            />
                        </div>

                    }
                </>
            ) : (
                <div>
                    You dont have any items in your cart. please add some items.☹️
                </div>
            )}
        </DashboardLayouts>
    )
}

export default UserCart
