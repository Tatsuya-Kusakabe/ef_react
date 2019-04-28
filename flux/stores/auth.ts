import { default as store } from 'store';
import { Dispatcher } from '../dispatcher';
import { BaseStore } from '../base_store';
import { ActionTypes } from '../../utilities/constants';
import { Action, Jwt } from '../../utilities/types';

class BaseAuthStore extends BaseStore {
  getJwtObj(): Jwt {
    if (!store.get('jwt')) {
      const initJwt = { accessToken: null, tokenType: null, expiresAt: null, expiresIn: null };
      store.set('jwt', initJwt);
    }

    return store.get('jwt');
  }

  setJwtObj(jwt: Jwt): void {
    store.set('jwt', jwt);
  }
}

const AuthStore = new BaseAuthStore();

AuthStore.dispatchToken = Dispatcher.register((payload: any) => {
  const action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.AUTH__SIGN_UP:
    case ActionTypes.AUTH__SIGN_IN:
      AuthStore.setJwtObj(action.token);
      AuthStore.emitChange();
      break;

    default:
  }

  return true;
});

export default AuthStore;
