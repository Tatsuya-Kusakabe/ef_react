import { EventEmitter2 as EventEmitter } from 'eventemitter2';

const CHANGE_EVENT = 'change';

interface Storage {
  [key: string]: any;
}

export class BaseStore extends EventEmitter {
  // HogeStore.disptachToken は常に使用するので、BaseStore で初期化
  // (https://qiita.com/Tsuyoshi84/items/e74109e2ccc0f4e625aa)
  _storage: Object;
  dispatchToken: string;

  constructor() {
    super();
    this._storage = {};
    this.dispatchToken = '';
  }

  emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  onChange(callback: () => void): void {
    this.on(CHANGE_EVENT, callback);
  }

  offChange(callback: () => void): void {
    this.off(CHANGE_EVENT, callback);
  }

  getStorage(): Storage {
    if (this._storage) return this._storage;

    const newObj = {};
    this._storage = newObj;
    return newObj;
  }

  get(key: string): any {
    return this.getStorage()[key];
  }

  set(key: string, value: any): void {
    this.getStorage()[key] = value;
  }
}
