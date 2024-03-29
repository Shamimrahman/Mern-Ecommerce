import React, { useEffect, useState } from "react";
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
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import OrderSuccess from "./Components/Cart/orderSuccess";
import axios from "axios";
import { useSelector } from "react-redux";

//payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Components/Cart/Payment";
import ListOrders from "./Components/Order/ListOrders";
import OrderDetails from "./Components/Order/OrderDetails";

//admin
import Dashboard from "./Components/admin/Dashboard";
import Productslist from "./Components/admin/Productslist";
import Newproduct from "./Components/admin/Newproduct";
import Updateproduct from "./Components/admin/Updateproduct";
import Orderlists from "./Components/admin/Orderlists";
import ProcessOrder from "./Components/admin/ProcessOrder";
import UsersList from "./Components/admin/UsersList";
import UpdateUser from "./Components/admin/UpdateUser";
import ProductReviews from "./Components/admin/ProductReviews";

//https://www.codegrepper.com/code-examples/javascript/react+router+version+5+install+
const App = () => {
  //payment
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    //jate refresh korleo logout na hoy
    store.dispatch(loadUser());
    //payment process er jonno stripe api key get kora
    async function getStripeApiKey() {
      const { data } = await axios.get("api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

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
            <ProtectRoute path="/shipping" component={Shipping}></ProtectRoute>
            <ProtectRoute
              path="/confirm"
              component={ConfirmOrder}
              exact
            ></ProtectRoute>
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectRoute path="/payment" component={Payment} />
              </Elements>
            )}
            <ProtectRoute
              path="/success"
              component={OrderSuccess}
            ></ProtectRoute>

            <ProtectRoute
              path="/orders/me"
              component={ListOrders}
              exact
            ></ProtectRoute>
            <ProtectRoute path="/order/:id" component={OrderDetails} exact />
          </div>
          <ProtectRoute
            path="/dashboard"
            isAdmin={true}
            component={Dashboard}
            exact
          />

          <ProtectRoute
            path="/admin/products"
            isAdmin={true}
            component={Productslist}
            exact
          />

          <ProtectRoute
            path="/admin/product"
            isAdmin={true}
            component={Newproduct}
            exact
          />

          <ProtectRoute
            path="/admin/product/:id"
            isAdmin={true}
            component={Updateproduct}
            exact
          />
          <ProtectRoute
            path="/admin/orders"
            isAdmin={true}
            component={Orderlists}
            exact
          />

          <ProtectRoute
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
            exact
          />

          <ProtectRoute
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
            exact
          />
          <ProtectRoute
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
            exact
          />
          <ProtectRoute
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
            exact
          />
        </div>
      </Router>

      {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
    </div>
  );
};

export default App;
