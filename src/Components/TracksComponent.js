import React, {Component} from 'react';
import {LikeSong, dislikeSong} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import {search, getSongsByAlbum} from '../lib/SpotifyUtil';


class TracksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_text: undefined,
            search_type: undefined,
            search_result_tracks: undefined,
            state_store: false,
        };
        this.doSearch();
    }

    doSearch() {

        if (this.props.match.params.albumId) {
            getSongsByAlbum(this.props.match.params.albumId).then(
                json => {
                    this.setState({search_result_tracks: json.tracks.items})
                })
        }
        else {
            search(this.props.match.params.search_text, this.props.match.params.search_type).then(
                json => {
                    this.setState({search_result_tracks: json.tracks.items})
                })
        }
    }

    routerUrlSong(e, songId) {
        this.props.match.params.trackId = songId
        let search_text = this.props.match.params.search_text
        let search_type = this.props.match.params.search_type
        let art_id = (search_type === "artist") ? this.props.match.params.artistId + "/" : ""
        let alb_id = (search_type === "track") ? "" : this.props.match.params.albumId + "/"
        this.props.history.push("/" + search_text + "/" + search_type + "/" + art_id + alb_id + songId + "/")
    }

    componentDidMount() {
        if (this.props.match.params.search_text && this.props.match.params.search_type)
            this.setState({search_text: this.props.match.params.search_text})
        this.setState({search_type: this.props.match.params.search_type})
        this.props.song ? this.setState({state_store: true}) : this.setState({state_store: false});
    }

    listItems() {
        let self = this;
        return (
            self.state.search_result_tracks ?
                self.state.search_result_tracks.map((res, i = 1) => {
                        return (
                            <li key={i} className="list-group-item" onClick={e => this.routerUrlSong(e, res.id)}>
                                Song {i + 1}: {res.name}
                                <button key={i} type="button" className="btn btn-default btn-sm borderButton"
                                        onClick={() => {
                                            this.props.song.indexOf(res) > -1 ? self.props.dislikeSong(res) : self.props.LikeSong(res)
                                        }}>
                                    {
                                        this.props.song.indexOf(res) > -1 ? <FaHeart style={{color: 'red'}}/> : <FaHeartO/>

                                    }
                                </button>
                            </li>
                        )
                    }
                ) :
                null
        )
    }

    render() {
        console.log("this.props",this.props)
        return (
            <ul className="list-group" style={{fontSize: 'large'}}>{this.listItems()}</ul>
        );
    }

}

function mapStateToProps(state) {
    return {
        song: state.SongsReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({LikeSong: LikeSong, dislikeSong: dislikeSong}, dispatch);
}

const SongList = connect(mapStateToProps, matchDispatchToProps)(TracksComponent)

export default withRouter(SongList);
