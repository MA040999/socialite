import { CREATE_POST, GET_POSTS, IS_EDIT_ACTIVE } from "./postTypes";
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

export const changeEditStatus = () => {
  return {
    type: IS_EDIT_ACTIVE,
  }
}
