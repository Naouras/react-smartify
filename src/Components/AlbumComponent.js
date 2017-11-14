import React, {Component} from 'react';
//import {getSongsByAlbum} from '../lib/SpotifyUtil';
import TracksList from './TracksComponent';
import { Route,withRouter } from 'react-router';
import {search, getAlbumsByArtist} from '../lib/SpotifyUtil';
//import App from './helpers'



class AlbumComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_tracks: undefined,
            albumId: undefined,
            albumName: undefined,
            search_result_albums: undefined
        };
        this.doSearchAlbums()
    }

    doSearchAlbums() {
        if(this.props.match.params.search_type === 'album')
        {
            search(this.props.match.params.search_text,'album').then(
                json => {
                    this.setState({search_result_albums: json.albums.items})
                })
        }
       else {
            if(this.props.artId && (this.props.match.params.search_type === 'artist'))
            this.doSearc(this.props.artId);
        }
    }

    doSearc(artistId) {
        getAlbumsByArtist(artistId).then(
            json => {
                this.setState({search_result_albums: json.items})
            })
    }

    doSearchtracks(e, id) {
        let search_text = this.props.match.params.search_text
        let search_type = this.props.match.params.search_type
        let art_id = (search_type === "artist") ? "/" + this.props.match.params.artistId + "/" : "/"
        this.props.history.push("/" + search_text + "/" + search_type + art_id + id)
    }

    componentDidMount() {
            this.doSearchAlbums()
    }

    render() {
        return (
            <div>
                {
                    this.state.search_result_albums ?
                        <div id="accordion" role="tablist"
                             aria-multiselectable="true"> {this.state.search_result_albums.map((obj) =>
                            <div key={obj.id}>
                                <div className="card">
                                    <div className="card-header" role="tab" id={(obj.name + obj.id).replace(/ /g, '')}>
                                        <h5 className="mb-0">
                                            <a data-toggle="collapse" href={'#' + obj.id} aria-controls={obj.id}
                                               onClick={e => this.doSearchtracks(e, obj.id)}>
                                                {obj.name}
                                            </a>
                                        </h5>
                                    </div>
                                </div>
                                <div id={obj.id} className="collapse" role="tabpanel"
                                     aria-labelledby={(obj.name + obj.id).replace(/ /g, '')} data-parent="#accordion">
                                    <div className="card-block">
{/*
                                                <Route path={`/:search_text/:search_type/:artistId/${obj.id}`} component={TracksList}/>
*/}
{/*
                                                <Route path={`/:search_text?/:search_type?/:artistId?/:albumId?`} component={TracksList}/>
*/}
                                         <Route
                                            path="/:search_text?/:search_type?/:artistId?/:albumId?"
                                            render={params => <TracksList {...params} albId={obj.id} />}
                                        />

                                    </div>
                                </div>
                            </div>
                        )}

                        </div>
                        :
                        undefined

                }

            </div>
        )
    }

}

export default withRouter(AlbumComponent);