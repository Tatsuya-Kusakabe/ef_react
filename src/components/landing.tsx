import { default as React, Component, Fragment } from 'react';
import { Header } from './header';
import { PostWithUser } from './../utilities/types';
import { default as PostAction } from './../actions/post';
import { default as PostStore } from './../stores/post';

interface Props {}
interface State {
  posts: PostWithUser[];
}

export default class Landing extends Component<Props, State> {
  onChangeHandler: () => void;

  constructor(props: Props) {
    super(props);
    this.state = this.initialState;
    this.onChangeHandler = this.onChange.bind(this);
  }

  get initialState(): State {
    return this.getStateFromStore();
  }

  getStateFromStore() {
    return { posts: PostStore.getPosts() };
  }

  componentDidMount() {
    PostAction.fetchPosts();
    PostStore.onChange(this.onChangeHandler);
  }

  componentWillUnmount() {
    PostStore.offChange(this.onChangeHandler);
  }

  onChange() {
    this.setState(this.getStateFromStore());
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div>Hi I am a landing page</div>
      </Fragment>
    );
  }
}
