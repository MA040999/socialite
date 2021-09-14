import {
  CHANGE_PAGE,
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  IS_COMMENT_ACTIVE,
  IS_CONFIRMATION_ACTIVE,
  IS_EDIT_ACTIVE,
  REMOVE_POST,
  REMOVE_POSTS,
  SELECTED_POST,
  UPDATE_POST,
} from "./postTypes";
import app from "../../axiosConfig";
import { verifyAuth } from "../auth/authActions";

export const getPosts = (page) => async (dispatch) => {
  try {
    const posts = await app.get(`/posts/get-posts?page=${page}`);
    dispatch({ type: GET_POSTS, payload: posts.data });
  } catch (error) {
    console.log(`error`, error);
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    const post = await app.get(`/posts/get-post/${id}`);
    dispatch({ type: GET_POST, payload: post.data });
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

export const deletePost = (id, history) => async (dispatch) => {
  try {
    dispatch(verifyAuth());
    await app.delete(`/posts/delete-post/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
    history && history.push('/')
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

export const removePost = () => {
  return {
    type: REMOVE_POST,
  };
};
export const removePosts = () => {
  return {
    type: REMOVE_POSTS,
  };
};

export const changePage = () => {
  return {
    type: CHANGE_PAGE,
  };
};

export const changeConfirmationStatus = () => {
  return {
    type: IS_CONFIRMATION_ACTIVE,
  };
};

export const changeComment = () => {
  return {
    type: IS_COMMENT_ACTIVE,
  };
};

export const changeSelectedPost = (id) => {
  return {
    type: SELECTED_POST,
    payload: id,
  };
};
