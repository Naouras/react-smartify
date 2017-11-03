import React, {Component} from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import TracksList from './TracksComponent';
import {Switch, Route} from 'react-router-dom';
//import {search} from '../lib/SpotifyUtil';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: undefined,
            resultSearch: null,
            search_text: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({typeSearch:nextProps.type})
    }

    componentDidMount() {
        if (this.state.search_text && this.state.typeSearch)
            this.setState({resultSearch:this.props.result})
    }
    componentWillMount() {
        let typeArray = ['artist', 'album', 'track'];
        if (this.props.match && (this.props.match.params.search_text && typeArray.indexOf(this.props.match.params.search_type) !== -1)) {
            this.setState({
                search_text: this.props.match.params.search_text,
                typeSearch: this.props.match.params.search_type
            })
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8">
                        {
                            (this.props.result) &&
                            <Switch>
                                <Route path="/smartify/artist/:search_text" render={(props) => (
                                    <Artist {...props} resultArtist={this.props.result.artists.items}/> )}/>
                                <Route path="/smartify/album/:search_text" render={(props) => (
                                    <Album {...props} resultAlbum={this.props.result.albums.items}/>)}/>
                                <Route path="/smartify/track/:search_text" render={(props) => (
                                    <TracksList {...props} Tracks={this.props.result.tracks.items}/>)}/>
                            </Switch>
                        }
                    </div>
                </div>
            </div>
        );
    }

}


export default Result;