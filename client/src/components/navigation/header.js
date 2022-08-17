import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <header className="bck_b_light">
            <div className="container">
                <div className="left">
                    <div className="logo">
                        WAVES
                    </div>
                </div>
                <div className="right">
                    <div className="top">
                        <>
                            <div className="cart_link">
                                <span>1</span>
                                <Link to="/dashboard/user/user_cart">
                                    My cart
                                </Link>
                            </div>

                            <Link to="/dashboard">
                                My account
                            </Link>
                            <span
                                onClick={()=> alert('log out')}
                            >
                                Log out
                            </span>

                            <Link to="/sign_in">
                                Log in
                            </Link>
                        </>
                    </div>
                    <div className="bottom">
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/shop">
                            Shop
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )

}

export default Header;