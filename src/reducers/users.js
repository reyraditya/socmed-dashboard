import { USERS } from '../actions/ActionTypes';

const initialState = {
    loading: false,
    users: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case USERS.LOADING:
        return {
            ...state,
            loading: true,
        };
    case USERS.FETCH_SUCCESS:
        return {
            ...state,
            loading: false,
            users: action.payload.data
        };
    case USERS.FETCH_ERROR:
        return {
            ...state,
            loading: false,
            users: action.payload.data
        };
    default:
        return state;
    };
};