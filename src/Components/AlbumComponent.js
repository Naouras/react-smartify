import React, {Component} from 'react';
import {getSongsByAlbum} from '../lib/SpotifyUtil';
import TracksList from './TracksComponent'

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_tracks: ''
        };
    }

    doSearchtracks(e, id) {
        getSongsByAlbum(id).then(
            json => {
                this.setState({search_tracks: json.tracks.items})
                console.log("tracks", json.tracks.items)
            })
    }

    render() {
        console.log("albumitems",this.props.resultAlbum)
        return (
            <div>
                {
                    this.props.resultAlbum ?
                        <div> {this.props.resultAlbum.map(obj =>
                            <div id="accordion" role="tablist" aria-multiselectable="true" key={obj.id}>
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
                                            <TracksList Tracks={this.state.search_tracks}/> : null}
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
export default Album;