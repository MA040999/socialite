import { AUTH, AUTH_ERROR, LOGOUT } from "./authTypes";

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
    default:
      return state;
  }
};

export default authReducer;
