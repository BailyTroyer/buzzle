import React from 'react';
import { render } from 'react-dom';
import './styles/index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

const element = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  element
);

serviceWorker.unregister();