import { BaseStore } from './_base_store';
import { Dispatcher } from '../actions/_dispatcher';
import { ActionTypes } from '../utilities/constants';
import { Action, PostWithUser } from '../utilities/types';

class BasePostStore extends BaseStore {
  getPosts(): PostWithUser[] {
    if (!this.get('posts')) this.set('posts', []);
    return this.get('posts');
  }

  setPosts(posts: PostWithUser[]): void {
    this.set('posts', posts);
  }
}

const PostStore = new BasePostStore();

PostStore.dispatchToken = Dispatcher.register((payload: any) => {
  const action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.POST__FETCH_POSTS:
      PostStore.setPosts(action.data);
      PostStore.emitChange();
      break;

    default:
  }

  return true;
});

export default PostStore;
