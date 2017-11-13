import {combineReducers} from 'redux';
import SongsReducer from './reducerActiveSong';

const allReducers = combineReducers({
   SongsReducer,
});
export default allReducers;