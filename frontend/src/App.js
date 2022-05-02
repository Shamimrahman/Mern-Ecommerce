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

//https://www.codegrepper.com/code-examples/javascript/react+router+version+5+install+
const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Route path="/" component={Home} exact />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetails} exact />
          </div>

          <Footer />
        </div>
      </Router>

      <Footer></Footer>
    </div>
  );
};

export default App;
