import { default as React, Component } from 'react';
import { default as styled } from 'styled-components';
import { Header } from './header';
import { Stream } from './stream';
import { PostWithUser } from './../utilities/types';
import { default as PostAction } from './../actions/post';
import { default as PostStore } from './../stores/post';

interface Props {}

interface State {
  posts: PostWithUser[];
}

export class Landing extends Component<Props, State> {
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
      <Wrapper>
        <Header />
        <Stream { ...this.state } />
      </Wrapper>
    );
  }
}

const Wrapper = styled('div')`
  height: 100vh;
  width: 100vw;
  background-color: rgb(230, 236, 240);
`;
