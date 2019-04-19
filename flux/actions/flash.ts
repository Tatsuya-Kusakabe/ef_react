import { Dispatcher } from '../dispatcher';
import { ActionTypes } from '../../src/utilities/constants';
import { Flash } from '../../src/utilities/types';

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
