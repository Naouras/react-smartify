import {combineReducers} from 'redux';
import tracksReducer from './TrackReducer';

const allReducers = combineReducers({
    tracksReducer,
});
export default allReducers;