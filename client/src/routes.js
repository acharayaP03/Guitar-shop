import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Loader } from './utils/tools'
import { useDispatch, useSelector } from 'react-redux'
import { userIsAuthenticated, userSignOut } from 'store/actions/user.action'

import { AuthGuard } from 'hoc/auth.guard' // returns component
import Header from 'components/navigation/header'
import MainLayouts from './hoc/main.layouts'
import RegisterLogin from './auth'
import Home from './components/home'
import Footer from './components/navigation/footer'
import Shop from 'components/shop'
import Product from 'components/product'
import UserDashboard from 'components/dashboard'
import UserInfo from 'components/dashboard/user/info'
import AdminProducts from 'components/dashboard/Products'
import AddProduct from 'components/dashboard/Products/addProduct'
import EditProduct from 'components/dashboard/Products/editProduct'
import UserCart from 'components/dashboard/user/cart'
function App() {
    const [loading, setLoading] = useState(true)
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch()

    /**
     * Since AuthGuard returns composed component,
     * Route element attrs has to receive compponnet.
     * below is the only way to prevent for warning happeningand component not loading at all
     */
    const Dashboard = AuthGuard(UserDashboard)
    const Info = AuthGuard(UserInfo)

    const signOutUser = () => {
        dispatch(userSignOut())
    }
    useEffect(() => {
        dispatch(userIsAuthenticated())
    }, [dispatch])

    useEffect(() => {
        if (users.auth !== null) {
            setLoading(false)
        }
    }, [users])

    return (
        <BrowserRouter>
            {loading ? (
                <Loader full={true} />
            ) : (
                <>
                    <Header users={users} signOutUsers={signOutUser} />
                    <MainLayouts>
                        <Routes>
                            <Route
                                path="/dashboard/admin/edit_product/:id"
                                element={<EditProduct />}
                            />
                            <Route
                                path="/dashboard/admin/add_products"
                                element={<AddProduct />}
                            />
                            <Route
                                path="/dashboard/admin/admin_products"
                                element={<AdminProducts />}
                            />
                            <Route
                                path="/dashboard/user/user_info"
                                element={<Info />}
                            />
                            <Route
                                path="/dashboard/user/user_cart"
                                element={<UserCart />}
                            />

                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/sign_in"
                                element={<RegisterLogin />}
                            />
                            <Route path="/" element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route
                                path="/product_detail/:id"
                                element={<Product />}
                            />
                        </Routes>
                    </MainLayouts>
                    <Footer />
                </>
            )}
        </BrowserRouter>
    )
}

export default App
