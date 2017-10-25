import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Form from './Components/SearchFormComponent'

class App extends Component {
    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-light bg-faded" style={{backgroundColor: 'aliceblue'}}>
                    <img src={logo} className="d-inline-block align-top App-logo" alt="logo"/>
                    <h2>Smartify</h2>
                </nav>
                <Form/>
            </div>
        );
    }
}

export default App;
