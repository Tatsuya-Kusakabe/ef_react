import { ActionTypes } from '../utilities/constants';
import { Flash } from '../utilities/types';
import { Dispatcher } from '../dispatcher';

interface SetFlashAction {
  type: typeof ActionTypes.FLASH__SET_FLASH;
  message: Flash;
}

export type FlashAction = SetFlashAction;

export default {
  setFlash(message: Flash): void {
    Dispatcher.handleServerAction({
      message,
      type: ActionTypes.FLASH__SET_FLASH,
    });
  },
};
