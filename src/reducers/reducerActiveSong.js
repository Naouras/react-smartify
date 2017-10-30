export default function (state = [], action) {
    switch (action.type) {
        case 'SONG_SELECTED':
            return action.tabIdSongs;
            break;
        default:
            return state;
    }
}
