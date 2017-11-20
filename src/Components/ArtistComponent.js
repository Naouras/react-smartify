import React, { Component } from 'react';
import AlbumComponent from './AlbumComponent';
import { Route, withRouter } from 'react-router';
import { search } from '../lib/SpotifyUtil';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchDataFunction } from '../actions/';

const propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  searchDataFunction: PropTypes.func
};
class ArtistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistId_selected: undefined,
      search_text: undefined,
      search_type: undefined,
      search_result_artists: undefined
    };
    this.doSearch(this.props.match.params.search_text);
  }
  doSearch(text) {
    if (this.props.match.params.search_text === text) {
      search(text, 'artist').then(json => {
        this.setState({ search_result_artists: json.artists.items });
      });
    }
  }
  doSearchAlbum(e, id, artistName) {
    this.props.history.push('/' + this.state.search_text + '/' + this.state.search_type + '/' + id);
    this.setState({ artistId_selected: id });
    this.props.searchDataFunction({
      search_text: this.state.search_text,
      search_type: 'artist',
      artistName: artistName
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.search_text !== nextProps.match.params.search_text) {
      this.doSearch(nextProps.match.params.search_text);
    }
  }

  componentDidMount() {
    if (this.props.match && (this.props.match.params.search_text && this.props.match.params.search_type === 'artist')) {
      this.setState({ search_text: this.props.match.params.search_text });
      this.setState({ search_type: this.props.match.params.search_type });
      this.doSearch(this.props.match.params.search_text, this.props.match.params.search_type);
    }
  }
  render() {
    console.log('search_result_artists,', this.state.search_result_artists);
    return (
      <div>
        {this.state.search_result_artists ? (
          <div>
            {' '}
            {this.state.search_result_artists.map(obj => (
              <div id="accordion" role="tablist" aria-multiselectable="true" key={obj.id}>
                <div className="card">
                  <div className="w3-container" role="tab" id={(obj.name + obj.id).replace(/ /g, '')}>
                    <div className="row">
                      <div className="col-md-6">
                        <h5 className="mb-0">
                          <a
                            data-toggle="collapse"
                            href={'#' + obj.id}
                            aria-controls={obj.id}
                            onClick={e => this.doSearchAlbum(e, obj.id, obj.name)}
                            style={{ fontSize: 'x-large' }}
                          >
                            {obj.images.map((res, i) => {
                              if (i === 2 && res)
                                return <img key={i} src={res.url} className="avatar" alt="Card  cap" />;
                              else return null;
                            })}
                          </a>
                        </h5>
                      </div>
                      <div className="col-md-6">
                        <h5 className="mb-0">
                          <a
                            data-toggle="collapse"
                            href={'#' + obj.id}
                            aria-controls={obj.id}
                            onClick={e => this.doSearchAlbum(e, obj.id, obj.name)}
                            style={{ fontSize: 'x-large' }}
                          >
                            {obj.name}
                          </a>
                        </h5>
                      </div>
                    </div>
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
                    <h1>List of albums:</h1>
                  </div>
                  <div className="card-block">
                    {(this.state.artistId_selected && this.state.artistId_selected === obj.id) ||
                    this.props.match.params.artistId === obj.id ? (
                      <Route
                        path="/:search_text/:search_type/:artistId?/:albumId?/:trackId?"
                        component={AlbumComponent}
                      />
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

function mapStateToProps(state, ownProps) {
  return {
    searchData: state.searchDataReducer
  };
}
const mapDispatchToProps = { searchDataFunction };
const ArtistComponentResult = connect(mapStateToProps, mapDispatchToProps)(ArtistComponent);
ArtistComponent.propTypes = propTypes;
export default withRouter(ArtistComponentResult);
