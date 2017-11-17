import React, { Component } from 'react';
import TracksComponent from './TracksComponent';
import { Route, withRouter, Switch } from 'react-router';
import { search, getAlbumsByArtist } from '../lib/SpotifyUtil';
import PropTypes from 'prop-types';
const propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  albumId: PropTypes.string,
  artistId: PropTypes.string,
  params: PropTypes.object,
  search_text: PropTypes.string,
  search_type: PropTypes.string
};
class AlbumComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_tracks: undefined,
      albumName: undefined,
      search_result_albums: undefined,
      albumId_selected: undefined
    };
    this.doSearchAlbums();
  }

  doSearchAlbums() {
    if (this.props.match.params.search_type === 'album') {
      this.doSearch();
    } else {
      if (this.props.match.params.artistId && this.props.match.params.search_type === 'artist')
        this.doSearchAlbumsByArtist(this.props.match.params.artistId);
    }
  }

  doSearchAlbumsByArtist(artistId) {
    getAlbumsByArtist(artistId).then(json => {
      this.setState({ search_result_albums: json.items });
    });
  }
  doSearch() {
    search(this.props.match.params.search_text, 'album').then(json => {
      this.setState({ search_result_albums: json.albums.items });
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.search_text !== nextProps.match.params.search_text) {
      this.doSearch(nextProps.match.params.search_text);
    }
  }
  componentDidMount() {
    this.doSearchAlbums();
  }
  doSearchtracks(e, id) {
    let search_text = this.props.match.params.search_text;
    let search_type = this.props.match.params.search_type;
    let art_id = search_type === 'artist' ? '/' + this.props.match.params.artistId + '/' : '/';
    this.props.history.push('/' + search_text + '/' + search_type + art_id + id);
    this.setState({ albumId_selected: id });
  }

  render() {
    return (
      <div>
        {this.state.search_result_albums ? (
          <div id="accordion" role="tablist" aria-multiselectable="true">
            {' '}
            {this.state.search_result_albums.map(obj => (
              <div key={obj.id}>
                <div className="card">
                  <div className="card-header" role="tab" id={(obj.name + obj.id).replace(/ /g, '')}>
                    <h5 className="mb-0">
                      <a
                        data-toggle="collapse"
                        href={'#' + obj.id}
                        aria-controls={obj.id}
                        onClick={e => this.doSearchtracks(e, obj.id)}
                      >
                        {obj.name}
                      </a>
                    </h5>
                  </div>
                </div>
                <div
                  id={obj.id}
                  className="collapse"
                  role="tabpanel"
                  aria-labelledby={(obj.name + obj.id).replace(/ /g, '')}
                  data-parent="#accordion"
                >
                  <div className="card-block">
                    {this.state.albumId_selected === obj.id || this.props.match.params.albumId === obj.id ? (
                      <Switch>
                        <Route
                          path="/:search_text?/:search_type?/:artistId?/:albumId?/:trackId?"
                          component={TracksComponent}
                        />
                        <Route path="/:search_text?/:search_type?/:albumId?/:trackId?" component={TracksComponent} />
                      </Switch>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}
AlbumComponent.propTypes = propTypes;
export default withRouter(AlbumComponent);
