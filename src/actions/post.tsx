import { default as request } from 'superagent';
import { Dispatcher } from '../dispatcher';
import { ActionTypes, Host } from '../utilities/constants';
import { RawPost, RawUser, PostWithUser } from '../utilities/types';

interface FetchPostsAction {
  type: typeof ActionTypes.POST__FETCH_POSTS;
  data: PostWithUser[];
}

export type PostAction = FetchPostsAction;

export default {
  fetchPosts(): void {
    // 生の users を取ってくる
    request
    .get(`${Host.server.dev}/users`)
    .end((err: any, res: any) => {
      const rawUsers: RawUser[] = JSON.parse(res.text);

      // 生の microposts を取ってくる
      request
      .get(`${Host.server.dev}/microposts`)
      .end((err: any, res: any) => {
        const rawPosts: RawPost[] = JSON.parse(res.text);

        // 生の posts, users を組み合わせた、表示用のデータを作成する
        const postsWithUsers: PostWithUser[] = rawPosts.map((post: RawPost) => {
          const user = rawUsers.find((user: RawUser) => user.id === post.user_id) || { name: '' };
          return { ...post, name: user.name };
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
