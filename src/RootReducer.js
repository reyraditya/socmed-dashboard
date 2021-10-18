import { combineReducers } from 'redux';
import { reducer as users } from './reducers/users';
import { reducer as posts } from './reducers/posts';
import { reducer as media } from './reducers/media';


export default combineReducers({
  users,
  posts,
  media,
});