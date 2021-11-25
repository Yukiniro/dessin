import { Constructor } from '../types/types';
import { removeFromArray } from '../util/util';

export default function ObservableMixin<TBase extends Constructor>(Base: TBase) {
  return class Observable extends Base {
    _listeners: { [key: string]: Array<any> } = {};

    /**
     * @description 绑定事件监听
     * @param {string} eventName 事件名
     * @param {callback} handler 回调函数
     */
    on(eventName: string, handler: (...args: any) => void): void {
      this._listeners[eventName] = this._listeners[eventName] || [];
      this._listeners[eventName].push(handler);
    }

    /**
     * @description 解绑事件监听
     * @param {string} eventName 事件名
     * @param {callback} handler 回调函数
     */
    off(eventName: string, handler: (...args: any) => void): void {
      if (!this._listeners[eventName]) {
        return;
      }

      removeFromArray(this._listeners[eventName], handler);
    }

    /**
     * @description 重置事件监听
     */
    resetListener(): void {
      this._listeners = {};
    }

    /**
     * @description 触犯事件
     */
    fire(...args: any): void {
      const eventName = args.shift();
      (this._listeners[eventName] || []).forEach((handler: (...args: any) => void) => {
        handler.call(this, ...args);
      });
    }
  };
}
