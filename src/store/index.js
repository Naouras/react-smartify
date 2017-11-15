import { createStore, applyMiddleware } from 'redux';
import allReducers from '../reducers';
import thunk from 'redux-thunk';

export function configureStore(initialState = {}) {
  const store = createStore(allReducers, initialState, applyMiddleware(thunk));
  return store;
}
const store = configureStore();
export default store;
