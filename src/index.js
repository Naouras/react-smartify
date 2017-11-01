import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import * as localStore from './localStore';


let store = createStore(allReducers, localStore.get(), applyMiddleware(thunk));
store.subscribe(() => {
        let state = store.getState();
        localStore.set(state);
        console.log("store=", store.getState());
    }
)
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
