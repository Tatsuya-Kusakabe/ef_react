import { Dispatcher } from '../dispatcher';
import { BaseStore } from '../base_store';
import { ActionTypes } from '../../src/utilities/constants';
import { Action, Flash, FlashKeys } from '../../src/utilities/types';

class BaseFlashStore extends BaseStore {
  getFlashesObj(): Flash[] {
    if (!this.get('flash')) this.set('flash', []);
    return this.get('flash');
  }

  getFlash(key: FlashKeys): (string | null) {
    if (!this.getFlashesObj().length) return null;

    const focusedFlash = this.getFlashesObj().find((selfFlash: Flash) => {
      return Object.keys(selfFlash)[0] === `${key}`;
    });

    return (!!focusedFlash) ? focusedFlash[key] : null;
  }

  setFlash(passedFlash: Flash): void {
    if (!this.getFlashesObj().length) this.set('flash', [passedFlash]);

    const updatedFlashesObj = this.getFlashesObj().map((selfFlash: Flash) => {
      return (Object.keys(selfFlash)[0] === Object.keys(passedFlash)[0])
        ? passedFlash : selfFlash;
    });

    this.set('flash', updatedFlashesObj);
  }
}

const FlashStore = new BaseFlashStore();

FlashStore.dispatchToken = Dispatcher.register((payload: any) => {
  const action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.AUTH__SIGN_UP:
    case ActionTypes.AUTH__SIGN_IN:
    case ActionTypes.AUTH__SIGN_OUT:
    case ActionTypes.FLASH__SET_FLASH:
      FlashStore.setFlash(action.message);
      FlashStore.emitChange();
      break;

    default:
  }

  return true;
});

export default FlashStore;
