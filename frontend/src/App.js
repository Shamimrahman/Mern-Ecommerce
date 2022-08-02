import React, { useEffect } from "react";
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
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./Components/User/Profile";
import ProtectRoute from "./Components/route/ProtectRoute";
import UpdateProfile from "./Components/User/UpdateProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import { RePassword } from "./Components/User/RePassword";
import Cart from "./Cart/Cart";

//https://www.codegrepper.com/code-examples/javascript/react+router+version+5+install+
const App = () => {
  //jate refresh korleo logout na hoy
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Route path="/" component={Home} exact />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetails} exact />
            <Route path="/register" component={Register} exact />

            <Route path="/login" component={Login} exact />
            <Route path="/password/forgot" component={ForgotPassword} exact />
            <Route path="/password/reset/:token" component={RePassword} exact />
            <Route path="/cart" component={Cart} exact />

            <ProtectRoute path="/me" component={Profile} exact />
            <ProtectRoute path="/me/update" component={UpdateProfile} exact />
            <ProtectRoute
              path="/password/update"
              component={UpdatePassword}
              exact
            />
          </div>
        </div>
      </Router>

      <Footer></Footer>
    </div>
  );
};

export default App;
