import types from '../actions/actionTypes';
function TrackReducer(state = [], action) {
  switch (action.type) {
    case types.SONG_Loved: {
      return [...state, action.song];
    }
    case types.SONG_DISLIKED: {
      return state.filter(song => song !== action.song);
    }
    case types.EXIST_SONG: {
      let result = state.filter(res => res.id === action.song.id).length;
      if (result > 0) return true;
      else return false;
    }
    default:
      return state;
  }
}
export default TrackReducer;
