import { Dispatcher } from './_dispatcher';
import { ActionTypes } from '../utilities/constants';
import { Flash } from '../utilities/types';

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
