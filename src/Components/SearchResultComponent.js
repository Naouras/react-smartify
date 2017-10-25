import React, {Component} from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import Track from './TrackComponent'

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: this.props.type
        };
    }

    componentWillReceiveProps() {
        this.setState({typeSearch: this.props.type})
    }

    render() {
        return (
            <div>

                {
                    this.state.typeSearch === 'artist' && this.props.result
                        ?
                        <Artist resultArtist={this.props.result.artists.items}/>
                        :
                        null
                }

                {
                    this.state.typeSearch === 'album' && this.props.result
                        ?
                        <Album resultAlbum={this.props.result.albums.items}/>
                        :
                        null
                }
                {
                    this.state.typeSearch === 'track' && this.props.result
                        ?
                        <Track resultTrack={this.props.result.tracks.items}/>
                        :
                        null
                }


            </div>
        )
    }

}


export default Result;