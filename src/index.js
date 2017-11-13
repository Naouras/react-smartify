import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';
import * as localStore from './localStore';
import store from './store/index'


store.subscribe(() => {
        let state = store.getState();
        localStore.set(state.SongsReducer);
        console.log("store=",store.getState())
    }
)
ReactDOM.render(

        <Provider store={store}>
            <BrowserRouter>
            <Route path="/:search_text?/:search_type?/:artistId?/:albumId?/:trackId?" component={App}></Route>
            </BrowserRouter>
        </Provider>
    , document.getElementById('root'));

registerServiceWorker();
