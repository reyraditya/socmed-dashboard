import axios from 'axios';
import { MEDIA } from './ActionTypes';

function fetchSuccessMedia(data) {
    return {
        type: MEDIA.ALBUMS_FETCH_SUCCESS,
        payload: { data },
    };
};

function fetchErrorMedia(data) {
    return {
        type: MEDIA.ALBUMS_FETCH_ERROR,
        payload: { data }
    };
};

export function fetchAlbum(userid) {
    return (dispatch) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${userid}/albums`)
        .then((res) => {
            if (res.status === 200) {
                dispatch(fetchSuccessMedia(res.data));
            };
        }).catch((e) => {
            dispatch(fetchErrorMedia(e.response));
        });
    };
}

function fetchSuccessPhotos(data) {
    return {
        type: MEDIA.PHOTOS_FETCH_SUCCESS,
        payload: { data },
    };
};

function fetchErrorPhotos(data) {
    return {
        type: MEDIA.PHOTOS_FETCH_ERROR,
        payload: { data }
    };
};

export function fetchPhotos(albumid) {
    return (dispatch) => {
        axios.get(`https://jsonplaceholder.typicode.com/albums/${albumid}/photos`)
        .then((res) => {
            if (res.status === 200) {
                dispatch(fetchSuccessPhotos(res.data));
            };
        }).catch((e) => {
            dispatch(fetchErrorPhotos(e.response));
        });
    };
}

