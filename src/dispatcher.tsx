import keyMirror from 'keymirror';
import { Dispatcher as BaseDispatcher } from 'flux';
import { Action } from './utilities/types';

interface DispatcherPayload {
  source: string;
  action: Action;
}

const PayloadSources = keyMirror({
  SERVER_ACTION: null,
  CLIENT_ACTION: null,
});

class ExtendedDispatcher extends BaseDispatcher<DispatcherPayload> {
  handleServerAction(action: Action) {
    const payload = {
      action,
      source: PayloadSources.SERVER_ACTION,
    };
    this.dispatch(payload);
  }

  handleClientAction(action: Action) {
    const payload = {
      action,
      source: PayloadSources.CLIENT_ACTION,
    };
    this.dispatch(payload);
  }
}

export const Dispatcher: ExtendedDispatcher = new ExtendedDispatcher();
