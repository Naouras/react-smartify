export default function(state = [], action) {
  switch (action.type) {
    case 'SONG_Loved': {
      return [...state, action.song];
    }
    case 'SONG_DISLIKED': {
      return state.filter(song => song !== action.song);
    }
    default:
      return state;
  }
}
