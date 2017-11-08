import React, {Component} from 'react';
import {getAlbumsByArtist} from '../lib/SpotifyUtil';
import AlbumsList from './AlbumComponent';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom'

class ArtistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_albums: '',
            artistName: '',
            artistId:undefined
        };
    }
    doSearchAlbum(e, id) {
        if(id !== this.state.artistId) {
            this.props.history.push(this.props.match.path+"/artistId/"+id)
            this.setState({artistId:id})
            getAlbumsByArtist(id).then(
                json => {
                    this.setState({search_albums: json.items})
                    this.setState({artistName: json.items.name})
                })
        }
    }
    render() {
        return (
            <div>
                {
                    this.props.resultArtist ?
                        <div> {this.props.resultArtist.map(obj =>
                            <div id="accordion" role="tablist" aria-multiselectable="true" key={obj.id}>
                                <div className="card">
                                    <div className="w3-container" role="tab"
                                         id={(obj.name + obj.id).replace(/ /g, '')}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h5 className="mb-0">
                                                    <a data-toggle="collapse" href={'#' + obj.id} aria-controls={obj.id}
                                                       onClick={e => this.doSearchAlbum(e, obj.id)}
                                                       style={{fontSize: 'x-large'}}>
                                                        {obj.images.map((res, i) => {
                                                            if (i === 2 && res !== '' && res !== null && res !== undefined)
                                                                return <img key={i} src={res.url} className="avatar" alt="Card  cap" />
                                                            else return null
                                                        })}
                                                    </a>
                                                </h5>
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className="mb-0">
                                                    <a data-toggle="collapse" href={'#' + obj.id} aria-controls={obj.id}
                                                       onClick={e => this.doSearchAlbum(e, obj.id)}
                                                       style={{fontSize: 'x-large'}}>
                                                        {obj.name}
                                                    </a>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id={obj.id} className="collapse" role="tabpanel"
                                     aria-labelledby={(obj.name + obj.id).replace(/ /g, '')}
                                     data-parent="#accordion">
                                    <div className="card-block">
                                        <h1>List of albums:</h1>
                                    </div>
                                    <div className="card-block">
                                        { this.state.artistId === obj.id && this.state.search_albums ?
                                            <Route path='/smartify/artist' render={(props) => (
                                            <AlbumsList resultAlbum={this.state.search_albums} artistId={obj.id}/>
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

export default withRouter(ArtistComponent) ;
