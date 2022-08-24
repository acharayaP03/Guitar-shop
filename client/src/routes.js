import React, {useEffect, useState} from "react";
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from "components/navigation/header";
import MainLayouts from "./hoc/main.layouts";
import RegisterLogin from "./auth";
import Home from "./components/home";
import Footer from "./components/navigation/footer";
import {Loader} from "./utils/tools";
import { useDispatch, useSelector } from "react-redux";
import {userIsAuthenticated, userSignOut} from "store/actions/user.action";

function App(props){
    const [loading, setLoading] = useState(true);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch()

    const signOutUser = () =>{
        dispatch(userSignOut())
    }
    useEffect(() =>{
        dispatch(userIsAuthenticated())
    }, [dispatch]);

    useEffect(() =>{
        if(users.auth !== null){
            setLoading(false)
        }
    },[users])
  return (
        <BrowserRouter>
            {
                loading ?
                    <Loader full={true} />
                    :
                    <>
                        <Header
                            users={users}
                            signOutUsers={signOutUser}
                        />
                        <MainLayouts>
                            <Routes>
                                <Route path="/sign_in" element={ <RegisterLogin />} />
                                <Route path="/" element={ <Home /> }/>
                            </Routes>
                        </MainLayouts>
                        <Footer/>
                    </>
            }
        </BrowserRouter>
  );
}

export default App;
