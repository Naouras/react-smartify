import React, {Component} from 'react';
//import {getSongsByAlbum} from '../lib/SpotifyUtil';
import TracksList from './TracksComponent';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {search,getAlbumsByArtist} from '../lib/SpotifyUtil';


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
        if (this.props.match.params.artistId){
            this.doSearc(this.props.match.params.artistId);
        }
        else{
            search(this.props.match.params.search_text, this.props.match.params.search_type).then(
                json => {
                    this.setState({search_result_albums: json.albums.items})
                })
        }

    }
    doSearc(artistId){
            getAlbumsByArtist(artistId).then(
                json => {
                    this.setState({search_result_albums: json.items})
                })
    }
    doSearchtracks(e, id) {
        this.props.match.params.albumId = id
        let search_text = this.props.match.params.search_text
        let search_type = this.props.match.params.search_type
        let art_id = (search_type === "artist") ? "/"+this.props.match.params.artistId+"/" : "/"
        let tra_id = (this.props.match.params.trackId) ? this.props.match.params.trackId+"/" : ""
        this.props.history.push("/"+search_text+"/"+search_type+art_id+id+tra_id)
        console.log("this.props.match.params.albumId",this.props.match.params.albumId)
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
                        <div id="accordion" role="tablist" aria-multiselectable="true" > {this.state.search_result_albums.map((obj) =>
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
                                        <Route path="/:search_text/:search_type/:artistId/:albumId"  component={TracksList}/>
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
export default withRouter(AlbumComponent) ;