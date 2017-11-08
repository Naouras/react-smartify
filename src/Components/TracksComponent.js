import React, {Component} from 'react';
import {LikeSong, dislikeSong} from '../actions/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import {search} from '../lib/SpotifyUtil';


class TracksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: '',
            search_result_tracks: undefined
        };
        this.doSearch();
    }

    doSearch() {
        search(this.props.match.params.search_text, 'track').then(
            json => {
                this.setState({search_result_tracks: json.tracks.items})
                console.log("typeOf,",typeof  json.tracks.items)
                json.tracks.items.map((res)=>console.log("tarcks Name", res.name))
            })
    }

    routerUrlSong(e, songId) {
        /*if(this.props.artistId && this.props.albumId){
            this.props.history.push(this.props.match.url+"/artistId/"+this.props.artistId+"/albumId/"+this.props.albumId+"/songId/"+songId)
        }
        else if(this.props.albumId){
            this.props.history.push(this.props.match.url+"/albumId/"+this.props.albumId+"/songId/"+songId)

        }
        else this.props.history.push(this.props.match.url+"/songId/"+songId)*/
    }

    componentDidMount() {
        if (this.props.match.params.search_text && this.props.match.params.search_type)
            this.doSearch()
    }

    listItems() {
        let self = this;
        return (
            self.state.search_result_tracks.map((res, i = 1) => {
                    return (
                        <li key={i} className="list-group-item" onClick={e => this.routerUrlSong(e, res.id)}>
                            Song {i + 1}: {res.name}
                            <button key={i} type="button" className="btn btn-default btn-sm borderButton"
                                    onClick={() => {
                                        self.props.song.indexOf(res.id) !== -1 ? self.props.dislikeSong(res) : self.props.LikeSong(res)
                                    }}
                            >
                                {self.props.song.indexOf(res.id) !== -1 ? <FaHeart style={{color: 'red'}}/> : <FaHeartO/>}
                            </button>
                        </li>
                    )
                }
            )
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
