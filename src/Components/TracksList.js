import React, {Component} from 'react';
import {selectSong} from '../actions/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TracksList extends Component {
    listItems() {
        let self = this;
        return (
            self.props.Tracks.map((res, i) => {
                    return (
                        <li key={i} className="list-group-item">
                            Song {i}: {res.name}
                            <button  key={i} type="button" className="btn btn-default btn-sm"
                                    onClick={() => self.props.selectSong(res.name)}
                            >
                                <span className="glyphicon glyphicon-star-empty"></span> Like
                            </button>
                        </li>
                    )
                }
            )
        )
    }

    render() {
        return (
            <ul className="list-group">{this.listItems()}</ul>
        );
    }

}

function mapStateToProps(state) {
    return {
        song: state.activeSongs
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectSong: selectSong}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(TracksList);
