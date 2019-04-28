import { default as React, Component } from 'react';
import { default as styled } from 'styled-components';
import { Host, TimeDiff } from '../../utilities/constants';
import { PostWithUser } from '../../utilities/types';

interface Props {
  posts: PostWithUser[];
}

interface State {}

export class Stream extends Component<Props, State> {
  render() {
    const { posts } = this.props;
    if (!posts) return <div />;

    return (
      <Wrapper>
        {
          posts.map((post: PostWithUser) => {
            return (
              <Post key={post.id}>
                <Icon src={`${Host.rails.dev}${post.image}`} />
                <Name>{post.name}</Name>
                <Date>{TimeDiff(post.createdAt)}</Date>
                <Text>{post.context}</Text>
              </Post>
            );
          })
        }
      </Wrapper>
    );
  }
}

const Wrapper = styled('div')`
  position: absolute;
  top: 80px;
  right: 10%;
  width: 45%;
  background-color: rgb(255, 255, 255);
`;

const Post = styled('div')`
  position: relative;
  min-height: 100px;
  box-sizing: border-box;
  border-bottom: solid 1px black;
`;

const Icon = styled('img')`
  position: absolute;
  top: 10px;
  left: 10px;
  height: 50px;
  width: 50px;
  border-radius: 25px;

  // 画像を正方形になるようにトリミング
  object-fit: cover;
`;

const Name = styled('div')`
  position: absolute;
  top: 10px;
  left: 80px;
  max-width: 150px;
  font-weight: bold

  // テキストが枠に収まらないとき、... で繋げる
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled('div')`
  position: absolute;
  top: 10px;
  left: 250px;
`;

const Text = styled('div')`
  position: absolute;
  top: 40px;
  left: 80px;
  right: 20px;
  bottom: 10px;
  overflow: scroll;
`;
