import { POSTS } from '../actions/ActionTypes';

const initialState = {
    userPosts: [],
    postComments: [],
    submitPosts: {},
    deletePosts: {},
    editPosts: {},
    submitComment: {},
    deleteComment: {},
    editComment: {},
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case POSTS.FETCH_SUCCESS:
      return {
        ...state,
        userPosts: action.payload.data,
      };
    case POSTS.FETCH_ERROR:
      return {
        ...state,
        userPosts: action.payload.data,
      };
    case POSTS.SUBMIT_SUCCESS:
      return {
        ...state,
        submitPosts: action.payload.data,
      };
    case POSTS.SUBMIT_ERROR:
      return {
        ...state,
        submitPosts: action.payload.data,
      };
    case POSTS.DELETE_SUCCESS:
      return {
        ...state,
        deletePosts: action.payload.data,
      };
    case POSTS.DELETE_ERROR:
      return {
        ...state,
        deletePosts: action.payload.data,
      };
    case POSTS.EDIT_SUCCESS:
      return {
        ...state,
        editPosts: action.payload.data,
      };
    case POSTS.EDIT_ERROR:
      return {
        ...state,
        editPosts: action.payload.data,
      };
    case POSTS.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        postComments: action.payload.data,
      };
    case POSTS.FETCH_COMMENTS_ERROR:
      return {
        ...state,
        postComments: action.payload.data,
      };
    case POSTS.SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        submitComment: action.payload.data,
      };
    case POSTS.SUBMIT_COMMENT_ERROR:
      return {
        ...state,
        submitComment: action.payload.data,
      };
    case POSTS.DELETE_COMMENTS_SUCCESS:
      return {
        ...state,
        deleteComment: action.payload.data,
      };
    case POSTS.DELETE_COMMENTS_ERROR:
      return {
        ...state,
        deleteComment: action.payload.data,
      };
    case POSTS.EDIT_COMMENTS_SUCCESS:
      return {
        ...state,
        editComment: action.payload.data,
      };
    case POSTS.EDIT_COMMENTS_ERROR:
      return {
        ...state,
        editComment: action.payload.data,
      };
    default:
      return state;
    }
};