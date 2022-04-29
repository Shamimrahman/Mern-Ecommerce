import React from "react";
import Home from "./Components/Home";
import Footer from "./Components/layout/Footer";
import Header from "./Components/layout/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import ProductDetails from "./Components/product/ProductDetails";

const App = () => {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route
          path="/product/:id"
          element={<ProductDetails></ProductDetails>}
        />
      </Routes>

      <Footer></Footer>
    </div>
  );
};

export default App;
