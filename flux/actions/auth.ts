import { default as request } from 'superagent';
import { Dispatcher } from '../dispatcher';
import { ActionTypes, Host, env } from '../../src/utilities/constants';
import { Flash } from '../../src/utilities/types';
import { default as history } from '../../src/utilities/history';

interface SignUpAction {
  type: typeof ActionTypes.AUTH__SIGN_UP;
  message: Flash;
}

interface SignInAction {
  type: typeof ActionTypes.AUTH__SIGN_IN;
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
    request
      .post(`${Host.node[env]}/auth/sign_up`)
      .send({ name, email, password })
      .end((err: any, res: any) => {
        if (err) console.log(err);

        const { user, message } = JSON.parse(res.text);
        Dispatcher.handleServerAction({
          message: { auth: message },
          type: ActionTypes.AUTH__SIGN_UP,
        });

        // ユーザが見つかれば、トップ画面へリダイレクト
        // (https://stackoverflow.com/questions/42701129/)
        if (user) history.push('./map');
      });
  },

  signIn(email: string, password: string): void {
    request
      .post(`${Host.node[env]}/auth/sign_in`)
      .send({ email, password })
      .end((err: any, res: any) => {
        if (err) console.log(err);

        const { user, message } = JSON.parse(res.text);
        Dispatcher.handleServerAction({
          message: { auth: message },
          type: ActionTypes.AUTH__SIGN_IN,
        });

        if (user) history.push('./map');
      });
  },

  signOut(): void {
    request
      .get(`${Host.node[env]}/auth/sign_out`)
      .end((err: any, res: any) => {
        if (err) console.log(err);

        const { message } = JSON.parse(res.text);
        Dispatcher.handleServerAction({
          message: { auth: message },
          type: ActionTypes.AUTH__SIGN_OUT,
        });

        history.push('./sign_in');
      });
  },
};