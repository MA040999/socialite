import { CREATE_POST, GET_ALL_POSTS } from "./postTypes";
import app from "../../axiosConfig";

export const getAllPost = () => async (dispatch) => {
    try {
        
    } catch (error) {
        
    }
}

export const createPost = (formData) => async (dispatch) => {
    try {
        const post = await app.post('/posts/createPost/', formData)
        dispatch({type: CREATE_POST, payload: post.data})
    } catch (error) {
        
    }
}