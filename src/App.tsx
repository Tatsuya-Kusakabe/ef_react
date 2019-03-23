import { default as React, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Landing } from './components/landing';

export const App = () => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={Landing} />
    </Fragment>
  </BrowserRouter>
);
