import { AUTH, LOGOUT, AUTH_ERROR } from "./authTypes";
import app from "../../axiosConfig";

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const login = ({ email, password }, history) => {
  return async (dispatch) => {
    try {
      const user = await app.post("/auth/login/", { email, password });
      dispatch({ type: AUTH, payload: user?.data });
      history.push("/");
    } catch (error) {
      dispatch(authError(error.response.data.message));
    }
  };
};

export const verifyAuth = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/verify-auth");
      dispatch({ type: AUTH, payload: user?.data });
    } catch {
      dispatch({ type: LOGOUT });
    }
  };
};

export const signup = ({ fullname, email, password }, history) => {
  return async (dispatch) => {
    try {
      const user = await app.post("/auth/signup", {
        fullname,
        email,
        password,
      });
      dispatch({ type: AUTH, payload: user?.data });
      history.push("/");
    } catch (error) {
      dispatch(authError(error.response.data.message));
    }
  };
};

export const logout = (history) => {
  return async (dispatch) => {
    await app.get("/auth/logout/");
    dispatch({ type: LOGOUT });
    history.push("/");
  };
};
