import { default as React, Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { default as Landing } from './components/landing';

export const App = () => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={Landing} />
    </Fragment>
  </BrowserRouter>
);

const About = () => (
  <Fragment>
    <h2>About</h2>
    <p>フレンズに投票するページです</p>
  </Fragment>
);

const Friends = () => (
  <Fragment>
    <h2>Friends</h2>
    <p>ここにフレンズのリストを書きます</p>
  </Fragment>
);
