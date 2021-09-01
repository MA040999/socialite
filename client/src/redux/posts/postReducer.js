import { CREATE_POST, GET_ALL_POSTS } from "./postTypes";

const intitalState = {
    
};

const postReducer = (state = intitalState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state
            }
        case CREATE_POST:
            return {
                ...state
            }
    
        default:
            return state
    }
}

export default postReducer