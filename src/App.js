import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Form from './Components/SearchFormComponent'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="card-header" style={{backgroundColor: 'ghostwhite'}}>
                    <h2>Smartify Application</h2>
                </div>
                <Form/>
            </div>
        );
    }
}

export default App;
