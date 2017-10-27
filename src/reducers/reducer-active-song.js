export default function (state = null, action) {
    switch (action.type) {
        case 'SONG_SELECTED':
            return action.payload;
            break;
    }
    return state;
}
