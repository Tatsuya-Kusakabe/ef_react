import { default as React, Fragment } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { default as history } from '../utilities/history';
import { MapIndex as Map } from './map';
import { PostIndex as Post } from './post';
import { AuthIndex as Auth } from './auth';
import { default as AuthStore } from '../stores/auth';

// Route の override は下記を参照
// (https://reacttraining.com/react-router/web/example/auth-workflow)

// ユーザ認証前のみアクセス可能なルーティング（ユーザ認証後はトップ画面へリダイレクト）
const RouteBeforeAuth = ({ exact, path, component: Component, ...rest }: any) => {
  return (
    <Route
      exact={exact ? true : false}
      path={path}
      render={(props: any) =>
        AuthStore.isAuthenticated() ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          <Component {...rest} {...props} />
        )
      }
    />
  );
};

// ユーザ認証後のみアクセス可能なルーティング（ユーザ認証前はログイン画面へリダイレクト）
const RouteAfterAuth = ({ exact, path, component: Component, ...rest }: any) => {
  return (
    <Route
      exact={exact ? true : false}
      path={path}
      render={(props: any) =>
        AuthStore.isAuthenticated() ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={'/sign_in'} />
        )
      }
    />
  );
};

export const App = () => (
  <Router history={history}>
    <Fragment>
      <RouteAfterAuth  exact path="/" component={Map} />
      <RouteAfterAuth  exact path="/post" component={Post} />
      <RouteBeforeAuth exact path="/sign_up" component={Auth} status="signUp"/>
      <RouteBeforeAuth exact path="/sign_in" component={Auth} status="signIn"/>
    </Fragment>
  </Router>
);
