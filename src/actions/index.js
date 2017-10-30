export const selectSong =(song) =>{
    console.log("You clicked a SONG: ", song);
    return {
        type: 'SONG_SELECTED',
        payload: song,
    }
};