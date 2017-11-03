import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Form from './Components/SearchFormComponent';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="card-header" style={{backgroundColor: 'aliceblue'}}>
                    <h1>Smartify Application</h1>
                </div>
                <Switch>
                    <Route exact path='/' component={Form}/>
                    <Route path='/smartify/:search_type/:search_text' component={Form}/>
                </Switch>
                {/*<Form/>*/}
            </div>
        );
    }
}

export default App;
