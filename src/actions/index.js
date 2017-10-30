export const selectSong =(song) =>{
    console.log("You clicked a SONG: ", song.name);
    let tabIdSongs=[];
    tabIdSongs.push(song.id);
    return {
        type: 'SONG_SELECTED',
        tabIdSongs:tabIdSongs
    }
};
