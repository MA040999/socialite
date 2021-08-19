import {
  AUTH,
  AUTH_ERROR,
  LOGOUT,
  VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAIL,
} from "./authTypes";

const intitalState = {
  isAuth: false,
  user: null,
  err: "",
};

const authReducer = (state = intitalState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        ...action.payload,
        err: "",
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: null,
        err: "",
      };
    case AUTH_ERROR:
      return {
        ...state,
        err: action.payload,
      };
    case VERIFY_AUTH_FAIL:
      return {
        ...state,
        isAuth: false,
        user: null,
        err: "",
      };
    case VERIFY_AUTH_SUCCESS:
      return {
        ...state,
        isAuth: action.isAuth,
        user: action.payload,
        err: "",
      };
    default:
      return state;
  }
};

export default authReducer;
