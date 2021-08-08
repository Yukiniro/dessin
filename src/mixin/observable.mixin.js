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
     * @description 触犯事件
     */
    fire: function () {
      let _args = [...arguments];
      let _eventName = _args[0];
      util.removeFromArray(_args, _eventName);
      (_listeners[_eventName] || []).forEach((handler) => {
        handler.call(this, ..._args);
      });
    },
  };
})();
