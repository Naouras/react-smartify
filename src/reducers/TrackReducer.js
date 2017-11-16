import types from '../actions/actionTypes';
function TrackReducer(state = [], action) {
  switch (action.type) {
    case types.SONG_Loved: {
      return [...state, action.song];
    }
    case types.SONG_DISLIKED: {
      return state.filter(song => song.id !== action.song.id);
    }
    default:
      return state;
  }
}
export default TrackReducer;
