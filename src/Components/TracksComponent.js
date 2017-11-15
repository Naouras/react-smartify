import React, { Component } from 'react';
import { LikeSong, dislikeSong } from '../actions/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import { search, getSongsByAlbum } from '../lib/SpotifyUtil';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  song: PropTypes.array,
  albumId: PropTypes.string,
  artistId: PropTypes.string,
  params: PropTypes.object,
  search_text: PropTypes.string,
  search_type: PropTypes.string,
  LikeSong: PropTypes.func,
  dislikeSong: PropTypes.func
};
class TracksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_text: undefined,
      search_type: undefined,
      search_result_tracks: undefined
    };
    this.doSearch();
  }

  doSearch() {
    if (this.props.match.params.albumId && this.props.match) this.doSearchTrack();
    else {
      this.search();
    }
  }
  search() {
    search(this.props.match.params.search_text, 'track').then(json => {
      this.setState({ search_result_tracks: json.tracks.items });
    });
  }
  doSearchTrack() {
    getSongsByAlbum(this.props.match.params.albumId).then(json => {
      this.setState({ search_result_tracks: json.tracks.items });
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.search_text !== nextProps.match.params.search_text) {
      this.doSearchTrack(nextProps.match.params.search_text);
    }
  }

  routerUrlSong(e, songId, res) {
    let search_text = this.props.match.params.search_text;
    let search_type = this.props.match.params.search_type;
    let art_id = search_type === 'artist' ? this.props.match.params.artistId + '/' : '';
    let alb_id = search_type === 'album' ? this.props.match.params.albumId + '/' : '';
    this.props.history.push('/' + search_text + '/' + search_type + '/' + art_id + alb_id + songId + '/');
  }

  componentDidMount() {
    this.doSearch();
  }

  existSong(song) {
    let result = this.props.song.filter(res => res === song).length;
    if (result > 0) return true;
    else return false;
  }

  listItems() {
    let self = this;
    return this.state.search_result_tracks
      ? this.state.search_result_tracks.map((res, i = 1) => {
          return (
            <li key={i} className="list-group-item" onClick={e => this.routerUrlSong(e, res.id, res)}>
              Song {i + 1}: {res.name}
              <button
                key={i}
                type="button"
                className="btn btn-default btn-sm borderButton"
                onClick={() => {
                  this.props.song && self.existSong(res) ? self.props.dislikeSong(res) : self.props.LikeSong(res);
                }}
              >
                {this.props.song && self.existSong(res) ? <FaHeart style={{ color: 'red' }} /> : <FaHeartO />}
              </button>
            </li>
          );
        })
      : null;
  }

  render() {
    return (
      <ul className="list-group" style={{ fontSize: 'large' }}>
        {this.listItems()}
      </ul>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    song: state.tracksReducer
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ LikeSong: LikeSong, dislikeSong: dislikeSong }, dispatch);
}

const SongList = connect(mapStateToProps, matchDispatchToProps)(TracksComponent);
TracksComponent.propTypes = propTypes;
export default withRouter(SongList);
