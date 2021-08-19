import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAIL,
} from "./authTypes";
import app from "../../axiosConfig";

const auth = (data) => {
  return {
    type: AUTH,
    payload: data,
  };
};

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const login = ({ username, password }, history) => {
  return async (dispatch) => {
    try {
      const user = await app.post("/login/", { username, password });
      dispatch(auth({ isAuth: true, user: user.data }));
      history.push("/dashboard");
    } catch (error) {
      dispatch(authError(error.response.data.message));
    }
  };
};

export const verifyAuth = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/");

      dispatch({ type: VERIFY_AUTH_SUCCESS, isAuth: true, payload: user.data });
    } catch {
      dispatch({ type: VERIFY_AUTH_FAIL });
    }
  };
};

export const signup = ({ fullname, username, password }, history) => {
  return async (dispatch) => {
    try {
      const user = await app.post("/signup", {
        fullname,
        username,
        password,
      });
      dispatch(auth({ isAuth: true, user: user.data }));
      history.push("/dashboard");
    } catch (error) {
      dispatch(authError(error.response.data.message));
    }
  };
};

export const logout = (history) => {
  return async (dispatch) => {
    await app.get("/logout/");
    dispatch({ type: LOGOUT });
    history.push("/login");
  };
};
