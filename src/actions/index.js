export const LoveSong =(song) =>{
    let tabIdSongs = [];
    tabIdSongs.push(song.id);
    console.log("You liked a SONG: ", tabIdSongs);
    return {
        type: 'SONG_Loved',
        tabIdSongs:song.id
    }
};

export const dislikeSong =(song) =>{
    console.log("You dislikeSong a SONG: ", song.id);
    return {
        type: 'SONG_DISLIKED',
        tabIdSongs:song.id
    }
};
