import React, {Component} from 'react';
import {LoveSong, dislikeSong} from '../actions/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TracksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: ''
        };
    }

    listItems() {
        let self = this;
        return (
            self.props.Tracks.map((res, i) => {
                    return (
                        <li key={i} className="list-group-item">
                            Song {i}: {res.name}
                            {
                                self.props.song.indexOf(res.id) === -1 ?
                                    <button key={i} type="button" className="btn btn-default btn-sm"
                                            onClick={() => self.props.LoveSong(res)}
                                    >
                                        <span className="glyphicon glyphicon-heart-empty"></span> No Like
                                    </button>
                                    :
                                    <button key={i} type="button" className="btn btn-default btn-sm"
                                            onClick={() => self.props.dislikeSong(res.name)} style={{color:'red'}}
                                    >
                                        <span className="glyphicon glyphicon-heart"></span> Like
                                    </button>
                            }
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
    return bindActionCreators({LoveSong: LoveSong, dislikeSong: dislikeSong}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TracksList);
