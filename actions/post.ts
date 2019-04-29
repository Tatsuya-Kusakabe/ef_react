import { default as axios } from 'axios';
import { Dispatcher } from './_dispatcher';
import { ActionTypes, Host, env } from '../utilities/constants';
import { RawPost, RawUser, PostWithUser } from '../utilities/types';

interface FetchPostsAction {
  type: typeof ActionTypes.POST__FETCH_POSTS;
  data: PostWithUser[];
}

export type PostAction = FetchPostsAction;

export default {
  fetchPosts(): void {
    // 生の users を取ってくる
    axios
      .get(`${Host.node[env]}/users`)
      .then((res: any) => {
        const rawUsers = res.data;

        // 生の microposts を取ってくる
        axios
          .get(`${Host.node[env]}/microposts`)
          .then((res: any) => {
            const rawPosts = res.data;

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
          })
          .catch((err: any) => console.log(err));
      })
      .catch((err: any) => console.log(err));
  },
};
