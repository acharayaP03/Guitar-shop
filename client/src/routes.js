import React from "react";
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from "components/navigation/header";
import Home from "./components/home";
import Footer from "./components/navigation/footer";
function App() {
  return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home /> }/>
            </Routes>
            <Footer/>
        </BrowserRouter>
  );
}

export default App;
