import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import SearchFormComponent from './Components/SearchFormComponent';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="card-header" style={{backgroundColor: '#f8f9fa'}}>
                    <h1>Smartify Application</h1>
                </div>
                <Switch>
                    <Route exact path='/' component={SearchFormComponent}/>
                    <Route path='/smartify/:search_type' component={SearchFormComponent}/>
                </Switch>
            </div>
        );
    }
}

export default App;
