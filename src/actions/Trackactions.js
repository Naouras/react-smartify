export const LikeSong = song => {
  console.log('You liked a SONG: ', song);
  return {
    type: 'SONG_Loved',
    song: song
  };
};

export const dislikeSong = song => {
  console.log('You dislikeSong a SONG: ', song);
  return {
    type: 'SONG_DISLIKED',
    song: song
  };
};

export const existSong = song => {
  console.log('exist SONG: ', song);
  return {
    type: 'SONG_EXIST',
    song: song
  };
};
