import { default as React, Component, Fragment } from 'react';
import { default as Header } from './header';

interface Props {}
interface State {}

export default class Landing extends Component<Props, State> {
  render() {
    return (
      <Fragment>
        <Header />
        <div>Hi I am a landing page</div>
      </Fragment>
    );
  }
}
