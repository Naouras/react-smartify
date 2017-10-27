import React, {Component} from 'react';

class TracksList extends Component {
    selectSong(song) {
        console.log("You clicked a SONG: ", song);
        return {
            type: 'SONG_SELECTED',
            payload: song
        }
    };

    listItems() {
        let self = this;
        return (
            self.props.Tracks.map((res, i) => {
                    return (
                        <li key={i} className="list-group-item">
                            Song {i}: {res.name}
                            <button  key={i} type="button" className="btn btn-default btn-sm"
                                    onClick={() => self.selectSong(res.name)}
                            >
                                <span className="glyphicon glyphicon-star-empty"></span> Like
                            </button>
                        </li>
                    )
                }
            )
        )
    }

    render() {
        return (
            <ul className="list-group">{this.listItems()}</ul>
        );
    }

}

/*function TracksList(props) {
    const Tracks = props.Tracks;
    const listItems = Tracks.map((res, i) =>
        <li key={i} className="list-group-item">
            Song {i}: {res.name}
            <button type="button" className="btn btn-default btn-sm">
                <span className="glyphicon glyphicon-star-empty"></span> Like
            </button>
            </li>
    );
    return (
        <ul className="list-group">{listItems}</ul>
    );
}*/

export default TracksList;