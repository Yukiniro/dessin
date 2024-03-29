import { Constructor } from '../types/types';
import { remove } from 'bittydash';

export default function ObservableMixin<TBase extends Constructor>(Base: TBase) {
  return class Observable extends Base {
    _listeners: { [key: string]: Array<any> } = {};

    /**
     * @desc 绑定事件监听
     * @param {string} eventName 事件名
     * @param {callback} handler 回调函数
     */
    on(eventName: string, handler: (...args: any) => void): void {
      this._listeners[eventName] = this._listeners[eventName] || [];
      this._listeners[eventName].push(handler);
    }

    /**
     * @desc 解绑事件监听
     * @param {string} eventName 事件名
     * @param {callback} handler 回调函数
     */
    off(eventName: string, handler: (...args: any) => void): void {
      if (!this._listeners[eventName]) {
        return;
      }

      remove(this._listeners[eventName], handler);
    }

    /**
     * @desc 移除所有事件监听
     */
    removeAllListeners(): void {
      this._listeners = {};
    }

    /**
     * @desc 触犯事件
     */
    fire(...args: any): void {
      const eventName = args.shift();
      (this._listeners[eventName] || []).forEach((handler: (...args: any) => void) => {
        handler.call(this, ...args);
      });
    }
  };
}
