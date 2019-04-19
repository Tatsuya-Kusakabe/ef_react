import { Dispatcher } from '../dispatcher';
import { ActionTypes } from '../utilities/constants';
import { Action, RawRoute, FormattedNode } from '../utilities/types';
import { BaseStore } from '../utilities/base_store';

class BaseMapStore extends BaseStore {
  getAllRoutes(): RawRoute[] {
    if (!this.get('allRoutes')) this.set('allRoutes', []);
    return this.get('allRoutes');
  }

  setAllRoutes(allRoutes: RawRoute[]): void {
    this.set('allRoutes', allRoutes);
  }

  getAllNodes(): FormattedNode[][] {
    if (!this.get('allNodes')) this.set('allNodes', []);
    return this.get('allNodes');
  }

  setAllNodes(allNodes: FormattedNode[][]): void {
    this.set('allNodes', allNodes);
  }
}

const MapStore = new BaseMapStore();

MapStore.dispatchToken = Dispatcher.register((payload: any) => {
  const action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.MAP__FETCH_ALL_ROUTES:
      MapStore.setAllRoutes(action.data);
      MapStore.emitChange();
      break;

    case ActionTypes.MAP__FETCH_ALL_NODES:
      MapStore.setAllNodes(action.data);
      MapStore.emitChange();
      break;

    default:
  }

  return true;
});

export default MapStore;