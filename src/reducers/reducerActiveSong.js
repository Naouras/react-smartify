export default function (state = [], action) {
    let tabIdSongs = [];
    tabIdSongs.push(action.tabIdSongs);
    switch (action.type) {
        case 'SONG_Loved': {
            return tabIdSongs
        }
        case 'SONG_DISLIKED': {
            return tabIdSongs
        }
        default:
            return state;
    }
}
