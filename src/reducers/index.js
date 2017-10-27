import {combineReducers} from 'redux';
import ActiveSongsReducer from './reducer-active-song';

const allReducers = combineReducers({
    activeSongs: ActiveSongsReducer
});

export default allReducers;