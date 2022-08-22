import React from "react";
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from "components/navigation/header";
import MainLayouts from "./hoc/main.layouts";
import RegisterLogin from "./auth";
import Home from "./components/home";
import Footer from "./components/navigation/footer";
function App() {
  return (
        <BrowserRouter>
            <Header />
            <MainLayouts>
                <Routes>
                    <Route path="/sign_in" element={ <RegisterLogin />} />
                    <Route path="/" element={ <Home /> }/>
                </Routes>
            </MainLayouts>
            <Footer/>
        </BrowserRouter>
  );
}

export default App;
