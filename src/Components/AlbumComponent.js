import React, {Component} from 'react';
import {getSongsByAlbum} from '../lib/SpotifyUtil';
import TracksList from './TracksComponent';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {search} from '../lib/SpotifyUtil';

class AlbumComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_tracks: undefined,
            albumId:undefined,
            albumName:undefined,
            search_result_albums:undefined
        };
        this.doSearchAlbums()
    }
    doSearchAlbums(){
        search(this.props.match.params.search_text, this.props.match.params.search_type).then(
            json => {
                this.setState({search_result_albums: json.albums.items})
                console.log("search_result_albums",json.albums.items)
            })
    }
    doSearchtracks(e, id) {
        //this.props.artistId ? this.props.history.push(this.props.match.url+"/artistId/"+this.props.artistId+"/albumId/"+id):this.props.history.push(this.props.match.url+"/albumId/"+id)
        getSongsByAlbum(id).then(
            json => {
                this.setState({search_tracks: json.tracks.items})
            })
    }
    componentDidMount() {
        if (this.props.match.params.search_text && this.props.match.params.search_type)
            this.doSearchAlbums()
    }

    render() {
        return (
            <div>
                {
                    this.state.search_result_albums ?
                        <div id="accordion" role="tablist" aria-multiselectable="true" > {this.state.search_result_albums .map(obj =>
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
                                        {this.state.search_tracks ?
                                            <Route path='/smartify/:search_type' render={(props) => (
                                            <TracksList Tracks={this.state.search_tracks} artistId={this.props.artistId} albumId={obj.id}/>
                                            )}/>
                                                : null}
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
//export default Album;
export default withRouter(AlbumComponent) ;