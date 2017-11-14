import React, { Component } from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import TracksList from './TracksComponent';
import { Route, withRouter } from 'react-router';
import PropTypes from 'prop-types';
const propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  search_type: PropTypes.string
};
class SearchResultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSearch: undefined
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params && (this.props.match.params.search_type !== nextProps.match.params.search_type) ) {
      this.doSearch(nextProps.match.params.search_text);
    }
  }
  render() {
    return (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            {this.props.match.params.search_type === 'artist' ? (
              <Route path="/:search_text/:search_type/:artistId?" component={Artist} />
            ) : null}
            {this.props.match.params.search_type === 'album' ? (
              <Route path="/:search_text/:search_type/:artistId?/:albumId?" component={Album} />
            ) : null}
            {this.props.match.params.search_type === 'track' ? (
              <Route path="/:search_text/:search_type/:artistId?/:albumId?/:trackId?" component={TracksList} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
SearchResultComponent.propTypes = propTypes;
export default withRouter(SearchResultComponent);
