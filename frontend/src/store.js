import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productReducers,
  productDetailsReducer,
} from "./reducers/productReducers";

import { authReducer } from "./reducers/userReducer";
//aikhane user reducer,order reducer gulo thakbe
const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  auth: authReducer,
});

//for cart a initial state 0 thakbe
let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
