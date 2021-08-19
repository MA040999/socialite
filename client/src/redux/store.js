import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/authReducer";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  authReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
