import React, { Component } from 'react';
import {search} from '../lib/SpotifyUtil';
import '../App.css';
import {FormGroup,FormControl,Checkbox,Button} from 'react-bootstrap'
import Result from './search_results'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search_text: '',
      search_type: 'artist',
      search_result: undefined
    }
    console.log("search_result",this.state.search_result);
  }

  render() {
    return (
      <div className="form">
            <form>
    <FormGroup bsSize="large" className="form_searchButton">
      <FormControl type="text" placeholder="Search" onChange={ e => this.setState({search_text: e.target.value})} value={this.state.search_text} />
    </FormGroup>
    <FormGroup>
      <Checkbox  checked={this.state.search_type === 'artist'}  onChange={e => this.setState({search_type: 'artist'})} >Artist</Checkbox>{' '}
      <Checkbox checked={this.state.search_type === 'album'} onChange={e => this.setState({search_type: 'album'})}>Album</Checkbox>{' '}
      <Checkbox checked={this.state.search_type === 'track'} onChange={e => this.setState({search_type: 'track'})} >Track</Checkbox>
     </FormGroup>
        </form>
        <Button bsStyle="info" onClick={ e => this.doSearchFunction()}>Search</Button>
        <Result result={this.state.search_result} />
      </div>
    );
  }

  doSearchFunction() {
    search(this.state.search_text, this.state.search_type).then(
      json => {
        this.setState({search_result: json})
    })
  }
}

export default Form;
