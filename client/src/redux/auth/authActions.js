import { AUTH, LOGOUT, AUTH_ERROR, VERIFY_AUTH } from "./authTypes";
import app from "../../axiosConfig";
import { addNotificationMsg } from "../posts/postActions";

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
      dispatch(addNotificationMsg(error.response.data.message));
    }
  };
};

export const verifyAuth = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/verify-auth");
      dispatch({ type: VERIFY_AUTH, payload: user?.data });

    } catch(error) {
      dispatch(addNotificationMsg(error.response.data.message));
      dispatch({ type: LOGOUT });
    }
  };
};

export const verifyRefreshToken = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/refresh-token");
      dispatch({ type: AUTH, payload: user?.data});
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
      dispatch(addNotificationMsg(error.response.data.message));
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
