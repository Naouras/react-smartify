import React, {Component} from 'react';
//import {getAlbumsByArtist} from '../lib/SpotifyUtil';
import AlbumsList from './AlbumComponent';
import { Route,withRouter } from 'react-router';
import {search} from '../lib/SpotifyUtil';



class ArtistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistId:undefined,
            search_text:undefined,
            search_type:undefined,
            search_result_artists:undefined
        };
        this.doSearch(this.props.match.params.search_text,this.props.match.params.search_type)
    }
    doSearch(text,type){
        if(this.props.match.params.search_text === text )
        {
            search(text,type).then(
                json => {
                    this.setState({search_result_artists: json.artists.items})
                })
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({search_text:nextProps.match.params.search_text})
        this.setState({search_type:nextProps.match.params.search_type})
    }
    doSearchAlbum(e, id) {
        if(id !== this.state.artistId) {
            this.props.history.push("/"+this.state.search_text+"/"+this.state.search_type+"/"+id)
            this.setState({artistId:id})
        }
    }

    componentDidMount(){
        if(this.props.match && (this.props.match.params.search_text && this.props.match.params.search_type === 'artist')){
            this.setState({search_text:this.props.match.params.search_text})
            this.setState({search_type:this.props.match.params.search_type})
            this.doSearch(this.props.match.params.search_text,this.props.match.params.search_type)
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
                                                    <a  data-toggle="collapse" href={'#' + obj.id} aria-controls={obj.id}
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
                                        <Route path={`/:search_text/:search_type/:${obj.id}`} component={AlbumsList}/>
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
