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

const initialState = {
  posts: [],
  isEditActive: false,
  selectedPost: null,
  isConfirmationActive: false,
  page: 1,
  maxPages: null,
  post: null,
  isCommentActive: false
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_POSTS:
      return {
        ...state,
        posts: [],
        page: 1
      }
    case REMOVE_POST:
      return{
        ...state, 
        post: null
      }
    case GET_POST:
      return {
        ...state, 
        post: action.payload
      }
    case GET_POSTS:
      return { ...state, posts: [ ...state.posts, ...action.payload.posts], maxPages: action.payload.maxPages };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts && state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post: state.post && action.payload
      };
    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case IS_CONFIRMATION_ACTIVE:
      return { ...state, isConfirmationActive: !state.isConfirmationActive };
    case IS_COMMENT_ACTIVE:
      return {
        ...state, isCommentActive: !state.isCommentActive
      }
    case IS_EDIT_ACTIVE:
      return { ...state, isEditActive: !state.isEditActive };
    default:
      return state;
  }
};

export default postReducer;
