import React, {Component} from 'react';
import {getSongsByAlbum} from '../lib/SpotifyUtil';
import TracksList from './TracksComponent';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom'

class AlbumComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_tracks: undefined,
            albumId:undefined,
            albumName:undefined
        };
    }
    doSearchtracks(e, id) {
        let local_path = this.props.location.pathname
        let exist =local_path.lastIndexOf('/albumId/')
        let next_result = local_path.substring(0, exist)
        if(exist > -1){
            this.props.history.push(next_result+"/albumId/"+id)
        }else{
            this.props.history.push(local_path+"/albumId/"+id)
        }
        getSongsByAlbum(id).then(
            json => {
                this.setState({search_tracks: json.tracks.items})
            })
    }

    render() {
        return (
            <div>
                {
                    this.props.resultAlbum ?
                        <div id={"accordion"+this.props.artistId} role="tablist" aria-multiselectable="true" key={this.props.artistId}> {this.props.resultAlbum.map(obj =>
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
                                     aria-labelledby={(obj.name + obj.id).replace(/ /g, '')} data-parent={"#accordion"+this.props.artistId}>
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