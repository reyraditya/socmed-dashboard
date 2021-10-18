import axios from 'axios';
import { USERS } from './ActionTypes';

function loadingUserList() {
    return {
        type: USERS.LOADING,
    };
};

function fetchSuccessUsers(data) {
    return {
        type: USERS.FETCH_SUCCESS,
        payload: { data }
    };
};

function fetchErrorUsers(data) {
    return {
        type: USERS.FETCH_ERROR,
        payload: { data }
    };
};

export function fetchUsersList() {
    return (dispatch) => {
        dispatch(loadingUserList());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
            if (res.status === 200) {
              dispatch(fetchSuccessUsers(res.data))
            };
        }).catch((e) => {
            dispatch(fetchErrorUsers(e.response))
        });
    };
};