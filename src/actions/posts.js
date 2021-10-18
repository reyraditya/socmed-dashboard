import axios from 'axios';
import { POSTS } from './ActionTypes';

function fetchSuccessPosts(data) {
    return {
        type: POSTS.FETCH_SUCCESS,
        payload: { data },
    };
};

function fetchErrorPosts(data) {
    return {
        type: POSTS.FETCH_ERROR,
        payload: { data }
    };
};

export function fetchUserPosts(userid) {
    return (dispatch) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${userid}/posts`)
        .then((res) => {
            if (res.status === 200) {
                dispatch(fetchSuccessPosts(res.data));
            };
        }).catch((e) => {
            dispatch(fetchErrorPosts(e.response));
        });
    };
};

function submitPostsSuccess(data) {
    return {
        type: POSTS.SUBMIT_SUCCESS,
        payload: { data },
    };
};

function submitPostsError(data) {
    return {
        type: POSTS.SUBMIT_ERROR,
        payload: { data }
    };
};

export function submitPost(payload) {
    return (dispatch) => {
        axios.post('https://jsonplaceholder.typicode.com/posts', payload, {
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((res) => {
            if (res.status === 200) {
                dispatch(submitPostsSuccess(res.data));
            }
        }).catch((e) => {
            dispatch(submitPostsError(e.response));
        })
    };
};

function editPostsSuccess(data) {
    return {
        type: POSTS.EDIT_SUCCESS,
        payload: { data },
    };
};

function editPostsError(data) {
    return {
        type: POSTS.EDIT_ERROR,
        payload: { data }
    };
};

export function editPost(postid, payload) {
    return (dispatch) => {
        axios.patch(`https://jsonplaceholder.typicode.com/posts/${postid}`, payload, {
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((res) => {
            if (res.status === 200) {
                dispatch(editPostsSuccess(res.data));
            }
        }).catch((e) => {
            dispatch(editPostsError(e.response));
        });
    };
};

function deleteSuccessPosts(data) {
    return {
        type: POSTS.DELETE_SUCCESS,
        payload: { data },
    };
};

function deleteErrorPosts(data) {
    return {
        type: POSTS.DELETE_ERROR,
        payload: { data }
    };
};

export function deleteUserPosts(postid) {
    return (dispatch) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postid}`)
        .then((res) => {
            if (res.status === 200) {
                dispatch(deleteSuccessPosts(res.data));
            };
        }).catch((e) => {
            dispatch(deleteErrorPosts(e.response));
        });
    };
};

function fetchSuccessComments(data) {
    return {
        type: POSTS.FETCH_COMMENTS_SUCCESS,
        payload: { data },
    };
};

function fetchErrorComments(data) {
    return {
        type: POSTS.FETCH_COMMENTS_ERROR,
        payload: { data },
    };
};

export function fetchComments(postid) {
    return (dispatch) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
        .then((res) => {
            if (res.status === 200) {
                dispatch(fetchSuccessComments(res.data));
            };
        }).catch((e) => {
            dispatch(fetchErrorComments(e.response));
        });
    };
};

function submitCommentSuccess(data) {
    return {
        type: POSTS.SUBMIT_COMMENT_SUCCESS,
        payload: { data }
    };
};

function submitCommentError(data) {
    return {
        type: POSTS.SUBMIT_COMMENT_ERROR,
        payload: { data }
    };
};

export function submitComment(postid, payload) {
    return (dispatch) => {
        axios.post(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`, payload, {
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((res) => {
            if (res.status === 200) {
                dispatch(submitCommentSuccess(res.data));
            }
        }).catch((e) => {
            dispatch(submitCommentError(e.response));
        })
    };
};

function deleteSuccessComments(data) {
    return {
        type: POSTS.DELETE_COMMENTS_SUCCESS,
        payload: { data },
    };
};

function deleteErrorComments(data) {
    return {
        type: POSTS.DELETE_COMMENTS_ERROR,
        payload: { data }
    };
};

export function deleteComments(commentId) {
    return (dispatch) => {
        axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
        .then((res) => {
            if (res.status === 200) {
                dispatch(deleteSuccessComments(res.data));
            };
        }).catch((e) => {
            dispatch(deleteErrorComments(e.response));
        });
    };
};

function editSuccessComments(data) {
    return {
        type: POSTS.EDIT_COMMENTS_SUCCESS,
        payload: { data },
    };
};

function editErrorComments(data) {
    return {
        type: POSTS.EDIT_COMMENTS_ERROR,
        payload: { data }
    };
};

export function editComments(commentId, payload) {
    return (dispatch) => {
        axios.patch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, payload, {
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        }).then((res) => {
            if (res.status === 200) {
                dispatch(editSuccessComments(res.data));
            };
        }).catch((e) => {
            dispatch(editErrorComments(e.response));
        });
    };
};