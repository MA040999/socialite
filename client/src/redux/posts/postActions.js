import {
  ADD_NOTIFICATION_MSG,
  CHANGE_PAGE,
  COMMENT,
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  IS_COMMENT_ACTIVE,
  IS_CONFIRMATION_ACTIVE,
  IS_EDIT_ACTIVE,
  IS_SEARCH_ACTIVE,
  REMOVE_NOTIFICATION_MSG,
  REMOVE_POST,
  REMOVE_POSTS,
  RESET_PAGE,
  SEARCH,
  SELECTED_POST,
  UPDATE_POST,
  FETCH_COMMENTS,
  STOP_LOADER,
  START_LOADER,
} from "./postTypes";
import app from "../../axiosConfig";
import { verifyAuth } from "../auth/authActions";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch(startLoader());
    const posts = await app.get(`/posts/get-posts?page=${page}`);
    dispatch({ type: GET_POSTS, payload: posts.data });
    dispatch(stopLoader());
  } catch (error) {
    dispatch(stopLoader());

    console.log(`error`, error);
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch(startLoader());
    const post = await app.get(`/posts/get-post/${id}`);
    dispatch({ type: GET_POST, payload: post.data });
    dispatch(stopLoader());
  } catch (error) {
    dispatch(stopLoader());

    console.log(`error`, error);
  }
};

export const createPost = (formData) => async (dispatch) => {
  try {
    dispatch(startLoader());
    dispatch(verifyAuth());
    const post = await app.post("/posts/create-post/", formData);
    dispatch({ type: CREATE_POST, payload: post.data });
    dispatch(stopLoader());
  } catch (error) {
    dispatch(stopLoader());

    console.log(`error`, error);
  }
};

export const updatePost = (formData, id) => async (dispatch) => {
  try {
    dispatch(startLoader());
    dispatch(verifyAuth());
    const { data } = await app.put(`/posts/update-post/${id}`, formData);
    dispatch({ type: UPDATE_POST, payload: data.updatedPost });
    dispatch({ type: ADD_NOTIFICATION_MSG, payload: data.message });
    dispatch(stopLoader());
  } catch (error) {
    dispatch(stopLoader());

    console.log(`error`, error);
  }
};

export const deletePost = (id, history) => async (dispatch) => {
  try {
    dispatch(startLoader());

    dispatch(verifyAuth());
    const { data } = await app.delete(`/posts/delete-post/${id}`);
    dispatch({ type: DELETE_POST, payload: id });

    dispatch({ type: ADD_NOTIFICATION_MSG, payload: data.message });

    history && history.push("/");
    dispatch(stopLoader());
  } catch (error) {
    dispatch(stopLoader());

    console.log(`error`, error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch(verifyAuth());
    const likedPost = await app.put(`/posts/like-post/${id}`);
    dispatch({ type: UPDATE_POST, payload: likedPost.data });
  } catch (error) {
    dispatch(stopLoader());

    console.log(`error`, error);
  }
};

export const comment = (formData, id) => async (dispatch) => {
  try {
    dispatch(startLoader());

    dispatch(verifyAuth());
    const updatedPost = await app.post(`/posts/comment/${id}`, formData);
    dispatch({ type: COMMENT, payload: updatedPost.data });
    dispatch(stopLoader());
  } catch (error) {
    dispatch(stopLoader());

    console.log(`error`, error);
  }
};

export const fetchComments = (ids) => async (dispatch) => {
  try {
    dispatch(startLoader());

    const { data } = await app.get(
      `/posts/fetch-comments?comments=${JSON.stringify(ids)}`
    );
    dispatch({ type: FETCH_COMMENTS, payload: data });
    dispatch(stopLoader());
  } catch (error) {
    dispatch(stopLoader());

    console.log(`error`, error.response.data);
  }
};

export const search = (searchTerm) => async (dispatch) => {
  try {
    dispatch(startLoader());

    const result = await app.get(`/posts/search?searchQuery=${searchTerm}`);
    dispatch({ type: SEARCH, payload: result.data });
    dispatch(stopLoader());
  } catch (error) {
    dispatch(stopLoader());

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

export const resetPage = () => {
  return {
    type: RESET_PAGE,
  };
};

export const addNotificationMsg = (msg) => {
  return {
    type: ADD_NOTIFICATION_MSG,
    payload: msg,
  };
};

export const removeNotificationMsg = () => {
  return {
    type: REMOVE_NOTIFICATION_MSG,
  };
};

export const changeSearchStatus = (status) => {
  return {
    type: IS_SEARCH_ACTIVE,
    payload: status,
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
export const startLoader = () => {
  return {
    type: START_LOADER,
  };
};
export const stopLoader = () => {
  return {
    type: STOP_LOADER,
  };
};

export const changeSelectedPost = (id) => {
  return {
    type: SELECTED_POST,
    payload: id,
  };
};
