
export default function (state = [], action) {
    switch (action.type) {
        case 'SONG_Loved': {
            return [
                ...state,
                action.song

            ]
        }
        case 'SONG_DISLIKED': {
            return state.filter(song =>
                song !== action.song
            );
        }
        case 'songExist': {
            let result = state.filter(song =>
                song === action.song
            );
            console.log("result.length ",result.length)
            return (result.length >0) ? true : null
        }
        default:
            return state;
    }
}

