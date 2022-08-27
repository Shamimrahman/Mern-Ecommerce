import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectRoute = ({ history, isAdmin, component: Component, ...rest }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login"></Redirect>;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login"></Redirect>;
            }

            return <Component {...props}></Component>;
          }}
        ></Route>
      )}
    </Fragment>
  );
};

export default ProtectRoute;
