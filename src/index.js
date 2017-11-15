import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import store from './store/index';

store.subscribe(() => {
  let state = store.getState();
  console.log('store=', state);
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:search_text?/:search_type?/:artistId?/:albumId?/:trackId?" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
