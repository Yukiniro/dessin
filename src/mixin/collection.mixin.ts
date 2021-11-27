import { Constructor } from '../types/types';
import { removeFromArray } from '../util/util';

export default function CollectionMixin<TBase extends Constructor>(Base: TBase) {
  return class Collection {
    _items: Array<any> = [];

    /**
     * @descrition 添加某个元素
     * @param {*} item
     */
    add(item: any): void {
      if (!this._items.includes(item)) {
        this._items.push(item);
      }
    }

    /**
     * @desc 移除某个元素
     * @param {*} item
     */
    remove(item: any): void {
      removeFromArray(this._items, item);
    }

    /**
     * @desc 对每个元素调用handler
     * @param {*} handler
     */
    forEachItem(handler: (item: any, index: number) => void) {
      this._items.forEach((item, index) => {
        handler.call(this, item, index);
      });
    }

    /**
     * @desc 返回当前元素个数
     */
    size(): number {
      return this._items.length;
    }

    /**
     * @desc 移除所有元素
     */
    removeAll(): void {
      this._items.length = 0;
    }

    /**
     * @desc 插入某个元素
     * @param {*} item
     * @param {number} index
     */
    inserAt(item: any, index: number) {
      this._items.splice(index, 0, item);
    }

    /**
     * @desc 集合是否包含某个元素
     * @param {*} item
     */
    includes(item: any): boolean {
      return this._items.includes(item);
    }

    /**
     * @desc 返回所有的项
     * @return
     */
    all(): Array<any> {
      return this._items;
    }
  };
}
