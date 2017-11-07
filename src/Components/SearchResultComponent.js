import React, {Component} from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import TracksList from './TracksComponent';
import {Switch, Route} from 'react-router-dom';

class SearchResultComponent extends Component {
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
                                <Route path="/smartify/artist" render={(props) => (
                                    <Artist {...props} resultArtist={this.props.result.artists.items}/> )}/>
                                <Route path="/smartify/album" render={(props) => (
                                    <Album {...props} resultAlbum={this.props.result.albums.items}/>)}/>
                                <Route path="/smartify/track" render={(props) => (
                                    <TracksList {...props} Tracks={this.props.result.tracks.items}/>)}/>
                            </Switch>
                        }
                    </div>
                </div>
            </div>
        );
    }

}


export default SearchResultComponent;