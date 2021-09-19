import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  VERIFY_AUTH,
  UPDATE_PROFILE,
} from "./authTypes";
import app from "../../axiosConfig";
import {
  addNotificationMsg,
  startLoader,
  stopLoader,
} from "../posts/postActions";

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const login = ({ email, password }, history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoader());

      const user = await app.post("/auth/login/", { email, password });
      dispatch({ type: AUTH, payload: user?.data });

      history.push("/");
      dispatch(stopLoader());
    } catch (error) {
      dispatch(stopLoader());
      dispatch(addNotificationMsg(error.response.data.message));
    }
  };
};

export const updateProfile = (formData, history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoader());

      const { data } = await app.put("/auth/update-profile/", formData);
      dispatch({ type: UPDATE_PROFILE, payload: data });

      history.push("/");
      dispatch(stopLoader());
    } catch (error) {
      dispatch(stopLoader());
      dispatch(addNotificationMsg(error.response.data.message));
    }
  };
};

export const verifyAuth = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/verify-auth");
      dispatch({ type: VERIFY_AUTH, payload: user?.data });
    } catch (error) {
      dispatch(stopLoader());
      dispatch(addNotificationMsg(error.response.data.message));
      dispatch({ type: LOGOUT });
    }
  };
};

export const verifyRefreshToken = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/refresh-token");
      dispatch({ type: AUTH, payload: user?.data });
    } catch {
      dispatch(stopLoader());
      dispatch({ type: LOGOUT });
    }
  };
};

export const signup = ({ fullname, email, password }, history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoader());

      const user = await app.post("/auth/signup", {
        fullname,
        email,
        password,
      });
      dispatch({ type: AUTH, payload: user?.data });

      history.push("/");
      dispatch(stopLoader());
    } catch (error) {
      dispatch(stopLoader());

      dispatch(addNotificationMsg(error.response.data.message));
    }
  };
};

export const logout = (history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoader());

      await app.get("/auth/logout/");
      dispatch({ type: LOGOUT });
      history.push("/");
      dispatch(stopLoader());
    } catch (error) {
      dispatch(stopLoader());
    }
  };
};
