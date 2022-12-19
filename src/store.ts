import { combineReducers, createStore, compose } from "redux";

import vendorReducer from "./reducers/vendor";
import userReducer from "./reducers/user";
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  vendor: vendorReducer,
  user: userReducer,
});

const store = createStore(rootReducer);
export default store;
