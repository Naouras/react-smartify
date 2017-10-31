import React, {Component} from 'react';
import {getAlbumsByArtist} from '../lib/SpotifyUtil';
import AlbumsList from './AlbumListsComponent';
import {Link} from 'react-router-dom'

class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_albums: '',
            artistName: ''
        };
    }

    doSearchAlbum(e, id) {
        getAlbumsByArtist(id).then(
            json => {
                this.setState({search_albums: json.items})
                this.setState({artistName: json.items.name})
            })
    }

    render() {
        return (
            <div>
                {
                    this.props.resultArtist ?
                        <div> {this.props.resultArtist.map(obj =>
                            <Link  key={obj.id} to={`/g/${obj.name}`}>
                            <div id="accordion" role="tablist" aria-multiselectable="true" key={obj.id}>
                                <div className="card">
                                    <div className="card-header" role="tab"
                                         id={(obj.name + obj.id).replace(/ /g, '')}>
                                        <h5 className="mb-0">
                                            <a data-toggle="collapse" href={'#' + obj.id} aria-controls={obj.id}
                                               onClick={e => this.doSearchAlbum(e, obj.id)}
                                               style={{fontSize: 'xx-large'}}>
                                                {obj.name}
                                                {obj.images.map((res, i) => {
                                                    if (i === 2 && res !== '' && res !== null && res !== undefined)
                                                        return <img key={i} src={res.url} alt="Card  cap"/>
                                                    else return null
                                                })}
                                            </a>
                                        </h5>
                                    </div>
                                </div>
                                <div id={obj.id} className="collapse" role="tabpanel"
                                     aria-labelledby={(obj.name + obj.id).replace(/ /g, '')}
                                     data-parent="#accordion">
                                    <div className="card-block">
                                        <h3>List of albums:</h3>
                                    </div>
                                    <div className="card-block">
                                        {this.state.search_albums ?
                                            <AlbumsList Albums={this.state.search_albums}/>
                                            : null}
                                    </div>
                                </div>
                            </div>
                            </Link>
                        )}
                        </div>
                        :
                        undefined
                }
            </div>
        )
    }

}

export default Artist;