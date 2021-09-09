import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  IS_EDIT_ACTIVE,
  SELECTED_POST,
  UPDATE_POST,
} from "./postTypes";
import app from "../../axiosConfig";

export const getPosts = () => async (dispatch) => {
  try {
    const posts = await app.get("/posts/getPosts/");
    dispatch({ type: GET_POSTS, payload: posts.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const createPost = (formData) => async (dispatch) => {
  try {
    const post = await app.post("/posts/createPost/", formData);
    dispatch({ type: CREATE_POST, payload: post.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const updatePost = (formData, id) => async (dispatch) => {
  try {
    const updatedPost = await app.patch(`/posts/updatePost/${id}`, formData);
    dispatch({ type: UPDATE_POST, payload: updatedPost.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await app.delete(`/posts/deletePost/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const likedPost = await app.patch(`/posts/likePost/${id}`);
    dispatch({ type: UPDATE_POST, payload: likedPost.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const dislikePost = (id) => async (dispatch) => {
  try {
    const dislikedPost = await app.patch(`/posts/dislikePost/${id}`);
    dispatch({ type: UPDATE_POST, payload: dislikedPost.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const changeEditStatus = () => {
  return {
    type: IS_EDIT_ACTIVE,
  };
};

export const changeSelectedPost = (id) => {
  return {
    type: SELECTED_POST,
    payload: id,
  };
};
