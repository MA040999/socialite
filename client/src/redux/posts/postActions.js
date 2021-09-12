import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  IS_CONFIRMATION_ACTIVE,
  IS_EDIT_ACTIVE,
  SELECTED_POST,
  UPDATE_POST,
} from "./postTypes";
import app from "../../axiosConfig";
import { verifyAuth } from "../auth/authActions";

export const getPosts = () => async (dispatch) => {
  try {
    const posts = await app.get("/posts/get-posts/");
    dispatch({ type: GET_POSTS, payload: posts.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const createPost = (formData) => async (dispatch) => {
  try {
    dispatch(verifyAuth());
    const post = await app.post("/posts/create-post/", formData);
    dispatch({ type: CREATE_POST, payload: post.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const updatePost = (formData, id) => async (dispatch) => {
  try {
    dispatch(verifyAuth());
    const updatedPost = await app.put(`/posts/update-post/${id}`, formData);
    dispatch({ type: UPDATE_POST, payload: updatedPost.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(verifyAuth());
    await app.delete(`/posts/delete-post/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch(verifyAuth());
    const likedPost = await app.put(`/posts/like-post/${id}`);
    dispatch({ type: UPDATE_POST, payload: likedPost.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const changeEditStatus = () => {
  return {
    type: IS_EDIT_ACTIVE,
  };
};

export const changeConfirmationStatus = () => {
  return {
    type: IS_CONFIRMATION_ACTIVE,
  };
};

export const changeSelectedPost = (id) => {
  return {
    type: SELECTED_POST,
    payload: id,
  };
};
