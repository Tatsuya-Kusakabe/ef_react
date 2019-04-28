import { default as React, Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { default as history } from '../utilities/history';
import { PostIndex as Post } from './post';
import { MapIndex as Map } from './map';
import { AuthIndex as Auth } from './auth';

export const App = () => (
  <Router history={history}>
    <Fragment>
      <Route exact path="/" component={Post} />
      <Route exact path="/map" component={Map} />
      <Route exact path="/sign_up" render={() => <Auth status="signUp"/>} />
      <Route exact path="/sign_in" render={() => <Auth status="signIn"/>} />
    </Fragment>
  </Router>
);
