import { AUTH, AUTH_ERROR, LOGOUT, VERIFY_AUTH } from "./authTypes";

const intitalState = {
  token: null,
  user: null,
  expiresIn: null,
  err: "",
};

const authReducer = (state = intitalState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.userData,
        expiresIn: action.payload.expiresIn,
        err: "",
      }
    case VERIFY_AUTH:
      return {
        ...state,
        user: action.payload,
        err: "",
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        err: "",
      };
    case AUTH_ERROR:
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
