import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  IS_CONFIRMATON_ACTIVE,
  IS_EDIT_ACTIVE,
  SELECTED_POST,
  UPDATE_POST,
} from "./postTypes";

const initialState = {
  posts: [],
  isEditActive: false,
  selectedPost: null,
  isConfirmationActive: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: [...action.payload] };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case IS_CONFIRMATON_ACTIVE:
      return { ...state, isConfirmationActive: !state.isConfirmationActive };
    case IS_EDIT_ACTIVE:
      return { ...state, isEditActive: !state.isEditActive };
    default:
      return state;
  }
};

export default postReducer;
