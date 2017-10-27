import {combineReducers} from 'redux';
import ActiveSongsReducer from './reducerActiveSong';

const allReducers = combineReducers({
    activeSongs: ActiveSongsReducer
});

export default allReducers;