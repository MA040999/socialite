import { CREATE_POST, GET_ALL_POSTS } from "./postTypes";

const postReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state
            }
        case CREATE_POST:
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state
    }
}

export default postReducer