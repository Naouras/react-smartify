import React, {Component} from 'react';
import {LikeSong, dislikeSong} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import {search, getSongsByAlbum} from '../lib/SpotifyUtil';
//import App from './helpers'


class TracksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_text: undefined,
            search_type: undefined,
            search_result_tracks: undefined,
        };
        this.doSearch();
    }

    doSearch() {
        if(this.props.match.params.search_type ==='track')
        {
            search(this.props.match.params.search_text, this.props.match.params.search_type).then(
                json => {
                    this.setState({search_result_tracks: json.tracks.items})
                })
        }
        else {
            if(this.props.albId && (this.props.match.params.search_type === 'artist' || this.props.match.params.search_type === 'album'))
            getSongsByAlbum(this.props.albId).then(
                json => {
                    this.setState({search_result_tracks: json.tracks.items})
                })
        }
    }

    routerUrlSong(e, songId) {
        let search_text = this.props.match.params.search_text
        let search_type = this.props.match.params.search_type
        let art_id = (search_type === "artist") ? this.props.match.params.artistId + "/" : ""
        let alb_id = (search_type === "album") ? this.props.match.params.albumId + "/": ""
        this.props.history.push("/" + search_text + "/" + search_type + "/" + art_id + alb_id + songId + "/")
    }
    componentDidMount() {
        this.doSearch();
    }

    listItems() {
        let self = this;
        return (
            this.state.search_result_tracks ?
                this.state.search_result_tracks.map((res, i = 1) => {
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
