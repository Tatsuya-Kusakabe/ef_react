import { default as axios } from 'axios';
import { Dispatcher } from '../dispatcher';
import { ActionTypes, Host, env } from '../../src/utilities/constants';
import { Flash, Jwt } from '../../src/utilities/types';
import { default as history } from '../../src/utilities/history';

interface SignUpAction {
  type: typeof ActionTypes.AUTH__SIGN_UP;
  token: Jwt;
  message: Flash;
}

interface SignInAction {
  type: typeof ActionTypes.AUTH__SIGN_IN;
  token: Jwt;
  message: Flash;
}

interface SignOutAction {
  type: typeof ActionTypes.AUTH__SIGN_OUT;
  message: Flash;
}

export type AuthAction =
    SignUpAction
  | SignInAction
  | SignOutAction;

export default {
  signUp(name: string, email: string, password: string): void {
    axios
      .post(`${Host.node[env]}/auth/sign_up`, { name, email, password })
      .then((res: any) => {
        const { token, message } = res.data;

        Dispatcher.handleServerAction({
          token,
          message: { auth: message },
          type: ActionTypes.AUTH__SIGN_UP,
        });

        // 認証が完了すれば、トップ画面へリダイレクト
        // (https://stackoverflow.com/questions/42701129/)
        if (token) history.push('./map');
      })
      .catch((err: any) => console.log(err));
  },

  signIn(email: string, password: string): void {
    axios
      .post(`${Host.node[env]}/auth/sign_in`, { email, password })
      .then((res: any) => {
        const { token, message } = res.data;

        Dispatcher.handleServerAction({
          token,
          message: { auth: message },
          type: ActionTypes.AUTH__SIGN_IN,
        });

        if (token) history.push('./map');
      })
      .catch((err: any) => console.log(err));
  },

  signOut(): void {
    axios
      .get(`${Host.node[env]}/auth/sign_out`)
      .then((res: any) => {
        const { message } = res.data;

        Dispatcher.handleServerAction({
          message: { auth: message },
          type: ActionTypes.AUTH__SIGN_OUT,
        });

        history.push('./sign_in');
      })
      .catch((err: any) => console.log(err));
  },
};
