import { CREATE_POST, GET_POSTS } from "./postTypes";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS:
      return [...action.payload];
    case CREATE_POST:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default postReducer;
