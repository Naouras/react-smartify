import React, { Component } from 'react';
import '../App.css';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import Result from './SearchResultComponent';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import FavoritesComponent from './FavoritesComponent';
import PropTypes from 'prop-types';
import { searchDataFunction } from '../actions/';
import { connect } from 'react-redux';

const propTypes = {
  history: PropTypes.object,
  searchDataFunction: PropTypes.func,
  searchData: PropTypes.array
};
class SearchFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_text: '',
      search_type: 'artist',
      stateSearch: true
    };
  }
  doSearchFunction() {
    this.props.history.push('/' + this.state.search_text + '/' + this.state.search_type);
    let result = this.props.searchData.filter(element => element.search_text === this.state.search_text).length;
    console.log('result', result);
    if (result === 0) {
      this.props.searchDataFunction({ search_text: this.state.search_text, search_type: this.state.search_type });
    }
  }

  handleChange(e) {
    if (e.target.value.length > 0) this.setState({ search_text: e.target.value });
    else {
      this.setState({ search_text: '' });
      this.props.history.push('/');
    }
  }
  search_history() {
    return this.props.searchData.map((item, key) => <option key={key} value={item.search_text} />);
  }
  handleSelectChange(e) {
    this.setState({ search_type: e.target.value, search_text: '' });
    this.props.history.push('/');
  }
  render() {
    return (
      <div style={{ marginTop: 15 }}>
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
        <div className="float-right">
          <FavoritesComponent />
        </div>
        <div style={{ marginTop: 15 }} className="row">
          {this.state.stateSearch ? (
            <Route path="/:search_text/:search_type" component={Result} />
          ) : (
            <div>Vérifier chamos texte</div>
          )}
        </div>
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
SearchFormComponent.propTypes = propTypes;
const SearchFormComponentResult = connect(mapStateToProps, mapDispatchToProps)(SearchFormComponent);
export default withRouter(SearchFormComponentResult);
