import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import NewPastePage from './pages/NewPastePage';
import ViewPastePage from './pages/ViewPastePage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage.js';
import LegalPage from './pages/LegalPage.js';
// import NotFoundPage from './pages/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={NewPastePage}/>
    <Route path="/new" component={NewPastePage} />
    <Route path="/history" component={HistoryPage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/legal" component={LegalPage} />
    <Route path="/view/:id" component={ViewPastePage} />
    <Route path=":id" component={ViewPastePage} />
  </Route>
);
