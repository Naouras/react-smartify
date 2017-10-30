import React, {Component} from 'react';
import {getAlbumsByArtist} from '../lib/SpotifyUtil';
import AlbumsList from './AlbumListsComponent';

class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_albums: ''
        };
    }

    doSearchAlbum(e, id) {
        getAlbumsByArtist(id).then(
            json => {
                this.setState({search_albums: json.items})
                console.log("search_albums", json.items)
            })
    }

    render() {
        return (
            <div>
                {
                    this.props.resultArtist ?
                        <div> {this.props.resultArtist.map(obj =>
                            <div id="accordion" role="tablist" aria-multiselectable="true" key={obj.id}>
                                <div className="card">
                                    <div className="card-header" role="tab" id={(obj.name + obj.id).replace(/ /g, '')}>
                                        <h5 className="mb-0">
                                            <a data-toggle="collapse" href={'#' + obj.id} aria-controls={obj.id}
                                               onClick={e => this.doSearchAlbum(e, obj.id)}>
                                                {obj.name}
                                            </a>
                                        </h5>
                                    </div>
                                </div>
                                <div id={obj.id} className="collapse" role="tabpanel"
                                     aria-labelledby={(obj.name + obj.id).replace(/ /g, '')} data-parent="#accordion">
                                    <div className="card-block">
                                        {/*{obj.images.map((res, i) =>
                                            <img key={i} src={res.url} alt="Card  cap"/>
                                        )}*/}
                                        {this.state.search_albums ?
                                            <AlbumsList Albums={this.state.search_albums}/>
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

/*function AlbumsList(props) {
    const Albums = props.Albums;
    const listItems = Albums.map((res, i) =>
        <li key={i} className="list-group-item" onclick={() => this.listSongs()}>Album {i}: {res.name}</li>
    );
    return (
        <ul className="list-group" style={{color:'red'}}>{listItems}</ul>
    );
}*/

export default Artist;