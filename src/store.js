import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './RootReducer';

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk),
  );
};
