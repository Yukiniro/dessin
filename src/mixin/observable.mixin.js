import util from '../util/util';

export default (function () {
  let _listeners = {};
  return {
    /**
     * @description 绑定事件监听
     * @param {string} eventName 事件名
     * @param {callback} handler 回调函数
     */
    on: function (eventName, handler) {
      _listeners[eventName] = _listeners[eventName] || [];
      _listeners[eventName].push(handler);
    },

    /**
     * @description 解绑事件监听
     * @param {string} eventName 事件名
     * @param {callback} handler 回调函数
     */
    off: function (eventName, handler) {
      if (!_listeners[eventName]) {
        return;
      }

      util.removeFromArray(_listeners[eventName], handler);
    },

    /**
     * @description 重置事件监听
     */
    resetListener: function () {
      _listeners = {};
    },

    /**
     * @description 触犯事件
     */
    fire: function () {
      const args = [...arguments];
      const eventName = args.shift();
      (_listeners[eventName] || []).forEach((handler) => {
        handler.call(this, ...args);
      });
    },
  };
})();
