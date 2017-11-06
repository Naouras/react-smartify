export const LoveSong =(song) =>{
    console.log("You liked a SONG: ",song.name);
    return {
        type: 'SONG_Loved',
        id:song.id,
    }
};

export const dislikeSong =(song) =>{
    console.log("You dislikeSong a SONG: ",song.name);
    return {
        type: 'SONG_DISLIKED',
        id:song.id,
    }
};
