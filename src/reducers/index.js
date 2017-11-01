import {combineReducers} from 'redux';
import SongsReducer from './reducerActiveSong';

const allReducers = combineReducers({
    SongsReducer:SongsReducer,
});
export default allReducers;