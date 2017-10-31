import React, {Component} from 'react';
import {getSongsByAlbum} from '../lib/SpotifyUtil';
import TracksList from './TracksComponent';
import {Modal} from 'react-bootstrap'


class AlbumsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            search_tracks: []
        };
    }

    hideModal = () => {
        this.setState({show: false});
    }

    doSearchtracks(e, id) {
        getSongsByAlbum(id).then(
            json => {
                this.setState({search_tracks: json.tracks.items})
            })
        this.setState({show: true});

    }

    listItems() {
        let self = this;
        return (
            self.props.Albums.map((res, i) => {
                    return (
                        <li key={i} className="list-group-item" data-toggle="modal" data-target="#myModal"
                            onClick={e => this.doSearchtracks(e, res.id)}>
                            Album {i}: {res.name}
                        </li>
                    )
                }
            )
        )
    }

    render() {
        return (
            <div>
                <ul className="list-group" style={{fontSize:'x-large', color:'blue'}}>{this.listItems()}</ul>
                <Modal
                    show={this.state.show}
                    onHide={this.hideModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title">List Album songs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TracksList Tracks={this.state.search_tracks}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.hideModal}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default AlbumsList;