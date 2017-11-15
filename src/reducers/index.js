import { combineReducers } from 'redux';
import tracksReducer from './TrackReducer';
import searchDataReducer from './SearchDataReducer';

const allReducers = combineReducers({
  tracksReducer,
  searchDataReducer
});
export default allReducers;
