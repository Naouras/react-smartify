import React, {Component} from 'react';
import {LikeSong, dislikeSong} from '../actions/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';


class TracksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: '',
        };
    }
    routerUrlSong(e,songId){
        let local_path = this.props.location.pathname
        let exist = local_path.lastIndexOf('/songId/')
        let path_result = local_path.substring(0, exist)
        if(exist > -1){
            this.props.history.push(path_result+"/songId/"+songId)
        }else{
            this.props.history.push(local_path+"/songId/"+songId)
        }
       // this.props.history.push(this.props.match.path+"/songId/"+songId)
        console.log("songId,",songId);
    }
    listItems() {
        let self = this;
        return (
            self.props.Tracks.map((res, i=1) => {
                return (
                    <li key={i} className="list-group-item" onClick={e=>this.routerUrlSong(e,res.id)}>
                        Song {i+1}: {res.name}
                        <button key={i} type="button" className="btn btn-default btn-sm borderButton"
                                onClick={() => {self.props.song.indexOf(res.id) !==-1 ?self.props.dislikeSong(res):self.props.LikeSong(res)}}
                        >
                            {self.props.song.indexOf(res.id) !==-1 ? <FaHeart style={{color:'red'}} />: <FaHeartO />}
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
        song:state.SongsReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({LikeSong: LikeSong, dislikeSong: dislikeSong}, dispatch);
}

const SongList =connect(mapStateToProps, matchDispatchToProps)(TracksComponent)

export default withRouter (SongList);
