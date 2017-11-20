import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { SearchFormComponent } from './Components/index';
import { Route, withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="card-header" style={{ backgroundColor: '#f8f9fa' }}>
          <h1>Smartify Application</h1>
        </div>
        <MuiThemeProvider>
          <Route path="/:search_text?/:search_type?/:artistId?/:albumId?/:trackId?" component={SearchFormComponent} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
