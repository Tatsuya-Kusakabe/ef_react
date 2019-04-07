import { default as React, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Landing } from './components/landing';
import { Map } from './components/map';

export const App = () => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/map" component={Map} />
    </Fragment>
  </BrowserRouter>
);
