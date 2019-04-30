import { BaseStore } from './_base_store';
import { Dispatcher } from '../actions/_dispatcher';
import { ActionTypes } from '../utilities/constants';
import { Action, Flash, FlashKeys } from '../utilities/types';

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

    // 一度 return したら flash を初期化する
    const cachedFlash = (!!focusedFlash) ? focusedFlash[key] : null;
    this.setFlash({ [key]: null });
    return cachedFlash;
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
