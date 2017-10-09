import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

import './semantic/semantic.min.css';
import './index.css';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.min.css';
import 'highlight.js/styles/agate.css';

// import ReactGA from 'react-ga';

// We only want to have GA run in production
if(process.env.REACT_APP_ENV === 'production') {
  // ReactGA.initialize('UA-254925-14');
}
// else {
//     const {whyDidYouUpdate} = require('why-did-you-update')
//     whyDidYouUpdate(React)
// }

const store = configureStore({}, browserHistory);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// function logPageView() {
//   ReactGA.set({ page: window.location.pathname });
//   ReactGA.pageview(window.location.pathname);
// }

ReactDOM.render(
  <Provider store={store}>

    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
