import { createStore, applyMiddleware, combineReducers } from 'redux';
import { tracksReducer, searchDataReducer } from '../reducers';
import thunk from 'redux-thunk';

export const allReducers = combineReducers({
  tracksReducer,
  searchDataReducer
});

export function configureStore(initialState = {}) {
  const store = createStore(allReducers, initialState, applyMiddleware(thunk));
  return store;
}
const store = configureStore();
export default store;
