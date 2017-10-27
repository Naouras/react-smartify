import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
/*import {Provider} from 'react-redux';
import allReducers from './reducers';
import * as localStore from './localStore'

let store = createStore(allReducers, localStore.get());
store.subscribe(() =>
    {
        let state =store.getState();
        console.log("state", state)
        localStore.set(state)
    }
)*/
ReactDOM.render(
    <App />, document.getElementById('root'));
registerServiceWorker();
