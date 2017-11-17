import React, { Component } from 'react';
import '../App.css';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import SearchResultComponent from './SearchResultComponent';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import FavoritesComponent from './FavoritesComponent';
import PropTypes from 'prop-types';
import { searchDataFunction } from '../actions/';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  history: PropTypes.object,
  searchDataFunction: PropTypes.func,
  searchData: PropTypes.array,
  tracks: PropTypes.array
};
class SearchFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_text: '',
      search_type: '',
      stateDialog: false,
      alertMessage: ''
    };
  }
  doSearchFunction() {
    this.state.search_text === ''
      ? this.setState({ alertMessage: 'Please enter your Search Key', stateDialog: true })
      : this.state.search_type === ''
        ? this.setState({
            alertMessage: 'Please select you Search Type',
            stateDialog: true
          })
        : this.props.history.push('/' + this.state.search_text + '/' + this.state.search_type);
    let result = this.props.searchData.filter(element => element.search_text === this.state.search_text).length;
    if (result === 0) {
      this.props.searchDataFunction({ search_text: this.state.search_text, search_type: this.state.search_type });
    }
  }

  handleChange(e) {
    if (e.target.value.length > 0) this.setState({ search_text: e.target.value, stateSearch: true });
    else {
      this.setState({ search_text: '' });
      this.props.history.push('/');
    }
  }
  handleClose() {
    this.setState({ stateDialog: false });
  }
  search_history() {
    return this.props.searchData.map((res, i) => (
      <option className="list-group-item" key={i} value={res.search_text} />
    ));
  }
  handleSelectChange(e) {
    this.setState({ search_type: e.target.value, search_text: '' });
    this.props.history.push('/');
  }
  render() {
    const actions = [<FlatButton label="close" primary onClick={e => this.handleClose()} />];
    return (
      <div style={{ marginTop: 15 }}>
        <Dialog actions={actions} modal={false} onRequestClose={e => this.handleClose()} open={this.state.stateDialog}>
          {this.state.alertMessage}
        </Dialog>
        <div style={{ justifyContent: 'center' }} className="row">
          <div className="col-md-4">
            <FormGroup className="form_searchButton">
              <FormControl
                type="text"
                placeholder="Search"
                onChange={e => this.handleChange(e)}
                value={this.state.search_text}
                list="search_history"
              />
              <datalist id="search_history">{this.search_history()}</datalist>
            </FormGroup>
          </div>
          <div className="col-md-2">
            <div className="row">
              <select
                className="form-control form-control-lg"
                value={this.state.search_type}
                onChange={e => this.handleSelectChange(e)}
              >
                <option value="">Select type</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="track">Track</option>
              </select>
            </div>
          </div>
          <div className="col-md-2">
            <Button className="btn btn-info" onClick={e => this.doSearchFunction()}>
              Search
            </Button>
          </div>
        </div>
        <hr className="hr" />
        {this.props.tracks.length > 0 ? (
          <div className="float-right Fvorite">
            <FavoritesComponent />Favorites Tracks
          </div>
        ) : null}
        <div style={{ marginTop: 15 }} className="row">
          <Route path="/:search_text/:search_type" component={SearchResultComponent} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    searchData: state.searchDataReducer,
    tracks: state.tracksReducer
  };
}
const mapDispatchToProps = { searchDataFunction };
SearchFormComponent.propTypes = propTypes;
const SearchFormComponentResult = connect(mapStateToProps, mapDispatchToProps)(SearchFormComponent);
export default withRouter(SearchFormComponentResult);
