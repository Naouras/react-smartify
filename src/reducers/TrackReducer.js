export default function(state = [], action) {
  switch (action.type) {
    case 'SONG_Loved': {
      return [...state, action.song];
    }
    case 'SONG_DISLIKED': {
      return state.filter(song => song !== action.song);
    }
    case 'SONG_EXIST': {
      let result = state.filter(res => res === action.song).length;
      if (result > 0) return true;
      else return false;
    }
    default:
      return state;
  }
}
