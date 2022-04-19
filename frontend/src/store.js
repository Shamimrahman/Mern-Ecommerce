import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productReducers } from "./reducers/productReducers";
//aikhane user reducer,order reducer gulo thakbe
const reducer = combineReducers({
  products: productReducers,
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
