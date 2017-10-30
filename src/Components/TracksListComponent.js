import React, {Component} from 'react';
import {selectSong} from '../actions/index'
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
                                self.props.song.indexOf(res.id) === -1  ?
                                    <button  key={i} type="button" className="btn btn-default btn-sm"
                                             onClick={() => self.props.selectSong(res)}
                                    >
                                        <span className="glyphicon glyphicon-thumbs-up"></span> No Like
                                    </button>
                                    :
                                    <button  key={i} type="button" className="btn btn-info btn-lg"
                                             onClick={() => self.props.selectSong(res.name)}
                                    >
                                        <span className="glyphicon glyphicon-thumbs-up"></span> Like
                                    </button>
                            }
                        </li>
                    )
                }
            )
        )
    }

    render() {
        console.log("lengthTab", this.props.song.length)
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
