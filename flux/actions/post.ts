import { default as request } from 'superagent';
import { camelizeKeys } from 'humps';
import { Dispatcher } from '../dispatcher';
import { ActionTypes, Host } from '../../src/utilities/constants';
import { RawPost, RawUser, PostWithUser } from '../../src/utilities/types';

interface FetchPostsAction {
  type: typeof ActionTypes.POST__FETCH_POSTS;
  data: PostWithUser[];
}

export type PostAction = FetchPostsAction;

export default {
  fetchPosts(): void {
    // 生の users を取ってくる
    request
    .get(`${Host.rails.dev}/users`)
    .end((err: any, res: any) => {
      const rawUsers = camelizeKeys(JSON.parse(res.text));

      // 生の microposts を取ってくる
      request
      .get(`${Host.rails.dev}/microposts`)
      .end((err: any, res: any) => {
        const rawPosts = camelizeKeys(JSON.parse(res.text));

        // 生の posts, users を組み合わせた、表示用のデータを作成する
        const postsWithUsers: PostWithUser[] = rawPosts.map((post: RawPost) => {
          const user = rawUsers.find((user: RawUser) => user.id === post.userId) ||
            { name: '' , image: { url : '' } };
          return { ...post, name: user.name, image: user.image.url };
        });

        // store への保存を発火する
        Dispatcher.handleServerAction({
          type: ActionTypes.POST__FETCH_POSTS,
          data: postsWithUsers,
        });
      });
    });
  },
};
