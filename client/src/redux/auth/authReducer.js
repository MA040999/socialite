import {
  AUTH,
  AUTH_ERROR,
  LOGOUT,
  // VERIFY_AUTH_SUCCESS,
  // VERIFY_AUTH_FAIL,
} from "./authTypes";

const intitalState = {
  user: null,
  err: "",
};

const authReducer = (state = intitalState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.payload,
        err: "",
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        err: "",
      };
    case AUTH_ERROR:
      return {
        ...state,
        err: action.payload,
      };
    // case VERIFY_AUTH_FAIL:
    //   return {
    //     ...state,
    //     user: null,
    //     err: "",
    //   };
    // case VERIFY_AUTH_SUCCESS:
    //   return {
    //     ...state,
    //     user: action.payload,
    //     err: "",
    //   };
    default:
      return state;
  }
};

export default authReducer;
