import types from './actionTypes';
export const LikeSong = song => {
  console.log('You liked a SONG: ', song);
  return {
    type: types.SONG_Loved,
    song: song
  };
};

export const dislikeSong = song => {
  console.log('You dislikeSong a SONG: ', song);
  return {
    type: types.SONG_DISLIKED,
    song: song
  };
};
