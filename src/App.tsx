import { default as React, Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { default as history } from './utilities/history';
import { Landing } from './components/landing';
import { Map } from './components/map';

export const App = () => (
  <Router history={history}>
    <Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/map" component={Map} />
    </Fragment>
  </Router>
);
