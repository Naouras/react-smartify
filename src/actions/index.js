export const LikeSong =(song) =>{
    console.log("You liked a SONG: ",song.name);
    return {
        type: 'SONG_Loved',
        song:song,
    }
};

export const dislikeSong =(song) =>{
    console.log("You dislikeSong a SONG: ",song.name);
    return {
        type: 'SONG_DISLIKED',
        song:song,
    }
};
