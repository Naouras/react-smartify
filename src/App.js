import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import SearchFormComponent from './Components/SearchFormComponent';
import { Route, withRouter } from 'react-router';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="card-header" style={{backgroundColor: '#f8f9fa'}}>
                    <h1>Smartify Application</h1>
                </div>
                    <Route  path="/:search_text?/:search_type?/:artistId?/:albumId?/:trackId?" component={SearchFormComponent}/>
            </div>
        );
    }
}

export default withRouter(App);
