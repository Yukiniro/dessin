import util from '../util/util';

export default (function () {
  const _items = [];
  return {
    /**
     * @descrition 添加某个元素
     * @param {*} item
     */
    add: function (item) {
      if (!_items.includes(item)) {
        _items.push(item);
      }
    },

    /**
     * @description 移除某个元素
     * @param {*} item
     */
    remove: function (item) {
      util.removeFromArray(_items, item);
    },

    /**
     * @description 对每个元素调用handler
     * @param {*} handler
     */
    forEachItem: function (handler) {
      _items.forEach((item, index) => {
        handler.call(this, item, index);
      });
    },

    /**
     * @description 返回当前元素个数
     */
    size: function () {
      return _items.length;
    },

    /**
     * @description 移除所有元素
     */
    removeAll: function () {
      _items.length = 0;
    },

    /**
     * @description 插入某个元素
     * @param {*} item
     * @param {number} index
     */
    inserAt: function (item, index) {
      _items.splice(index, 0, item);
    },

    /**
     * @description 集合是否包含某个元素
     * @param {*} item
     */
    includes: function (item) {
      return _items.includes(item);
    },

    /**
     * @description 返回所有的项
     * @returns
     */
    all: function () {
      return _items;
    },
  };
})();
