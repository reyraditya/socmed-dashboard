import { MEDIA } from '../actions/ActionTypes';

const initialState = {
    albums: [],
    photos: [],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case MEDIA.ALBUMS_FETCH_SUCCESS:
        return {
          ...state,
          albums: action.payload.data,
        }
      case MEDIA.ALBUMS_FETCH_ERROR:
        return {
          ...state,
          albums: action.payload.data,
        }
      case MEDIA.PHOTOS_FETCH_SUCCESS:
        return {
          ...state,
          photos: action.payload.data,
        }
      case MEDIA.PHOTOS_FETCH_ERROR:
        return {
          ...state,
          photos: action.payload.data,
        }
    default:
      return state;
    }
};