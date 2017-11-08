import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter,Route} from 'react-router-dom';
import * as localStore from './localStore';
import store from './store/store'


store.subscribe(() => {
        let state = store.getState();
        localStore.set(state.SongsReducer);
        console.log("store=",store.getState())
    }
)
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route path="/:search_text?/:search_type?/:artistId?/:albumId?" component={App}></Route>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
