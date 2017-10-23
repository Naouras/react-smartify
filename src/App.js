import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Form from './Components/form'
// import {search} from './lib/SpotifyUtil'

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
          <h2>Smartify</h2>
        </div>
        <Form />
      </div>
    );
  }
}

export default App;
