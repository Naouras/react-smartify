export default function (state = [], action) {
    //let tabIdSongs = [];
        //tabIdSongs.push(action.tabIdSongs);
console.log("state,",state);
console.log("tabIdSongs,",action.id);
    switch (action.type) {
        case 'SONG_Loved': {
            return [
                ...state,
                {
                    id:action.id
                }
            ]
        }
        case 'SONG_DISLIKED': {
            return state.filter(song =>
                song.id !== action.id
            );
        }
        default:
            return state;
    }
}
