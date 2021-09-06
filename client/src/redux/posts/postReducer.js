import { CREATE_POST, GET_POSTS, IS_EDIT_ACTIVE } from "./postTypes";

const initialState = {
  posts: [], 
  isEditActive: false
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {...state, posts: [...action.payload]};
    case CREATE_POST:
      return {...state, posts: [action.payload, ...state.posts]};
    case IS_EDIT_ACTIVE:
      return {...state, isEditActive: !state.isEditActive}
    default:
      return state;
  }
};

export default postReducer;
