import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import * as localStore from './localStore';
import {BrowserRouter} from 'react-router-dom'

let store = createStore(allReducers, localStore.get());
store.subscribe(() => {
        let state = store.getState();
        console.log("stateSauvgarder", state);
        localStore.set(state);
        console.log("typeOfState", typeof state)
    }
)
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
