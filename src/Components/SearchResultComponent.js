import React, {Component} from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import TracksList from './TracksComponent'

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: this.props.type,
            result:this.props.result,
        };
    }

    componentWillReceiveProps() {
        this.setState({typeSearch: this.props.type})
    }

    render() {
        let output = null
        {
            if (this.props.result) {
                this.state.typeSearch === 'artist'
                    ?
                    output = <Artist resultArtist={this.props.result.artists.items}/>
                    :
                    null

                this.state.typeSearch === 'album'
                    ?
                    output = <Album resultAlbum={this.props.result.albums.items}/>
                    :
                    null

                this.state.typeSearch === 'track' ?
                    output = <TracksList Tracks={this.props.result.tracks.items}/>
                    :
                    null
            }


        }
        return (
            <div>


                {output}

            </div>
        )
    }

}


export default Result;