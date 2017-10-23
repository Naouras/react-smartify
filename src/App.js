import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {search} from './lib/SpotifyUtil'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search_text: '',
      search_type: 'artist',
      search_result: undefined
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type='text' onChange={ e => this.setState({search_text: e.target.value})} value={this.state.search_text} /><br/>

        <input type='radio' checked={this.state.search_type === 'artist'} onChange={e => this.setState({search_type: 'artist'})} /> Artist
        <input type='radio' checked={this.state.search_type === 'album'} onChange={e => this.setState({search_type: 'album'})} /> Album
        <input type='radio' checked={this.state.search_type === 'track'} onChange={e => this.setState({search_type: 'track'})} /> Track
        <br/>
        <button onClick={ e => this.doSearch()}>Search</button>
        {
          (
            this.state.search_result ?
              <pre style={{textAlign: 'left'}}>{JSON.stringify(this.state.search_result, false, 3)}</pre>
            : undefined
          )
        }
      </div>
    );
  }

  // Private methods

  doSearch() {
    search(this.state.search_text, this.state.search_type).then(
      json => {
        this.setState({search_result: json})
    })
  }
}

export default App;
