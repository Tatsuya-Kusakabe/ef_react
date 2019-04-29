import { default as React, Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { default as history } from '../utilities/history';
import { MapIndex as Map } from './map';
import { PostIndex as Post } from './post';
import { AuthIndex as Auth } from './auth';

export const App = () => (
  <Router history={history}>
    <Fragment>
      <Route exact path="/" component={Map} />
      <Route exact path="/post" component={Post} />
      <Route exact path="/sign_up" render={() => <Auth status="signUp"/>} />
      <Route exact path="/sign_in" render={() => <Auth status="signIn"/>} />
    </Fragment>
  </Router>
);
