import React, {Component} from 'react';
import {getAlbumsByArtist} from '../lib/SpotifyUtil';
//import AlbumsList from './AlbumComponent';
//import { Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {search} from '../lib/SpotifyUtil';


class ArtistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_albums: '',
            artistName: '',
            artistId:undefined,
            search_text:undefined,
            search_result_artists:undefined
        };
        this.doSearch();
    }
    doSearch(a,b){
             search(a,b).then(
                   json => {
                       this.setState({search_result_artists: json.artists.items})
                       console.log("json.artists.items",json.artists.items)
                   })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match && (this.props.match.params.search_text && this.props.match.params.search_type === 'artist')){
            this.doSearch(this.props.match.params.search_text, 'artist')
        }
    }
    doSearchAlbum(e, id) {
        if(id !== this.state.artistId) {
            this.props.history.push("/:search_text/:search_type/artistId/"+id)
            this.setState({artistId:id})
            getAlbumsByArtist(id).then(
                json => {
                    this.setState({search_albums: json.items})
                    this.setState({artistName: json.items.name})
                })
        }
    }

    componentDidMount(){
        if(this.props.match && (this.props.match.params.search_text && this.props.match.params.search_type === 'artist')){
            this.doSearch(this.props.match.params.search_text, 'artist')
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.search_result_artists ?
                        <div> {this.state.search_result_artists.map(obj =>
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
                                        {/*{ this.state.artistId === obj.id && this.state.search_albums ?
                                            <Route path='/smartify/artist' render={(props) => (
                                            <AlbumsList resultAlbum={this.state.search_albums} artistId={obj.id}/>
                                            )}/>
                                                : null}*/}
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
