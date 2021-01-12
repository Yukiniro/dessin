import util from "../util/util";

export default (function () {

  let _listeners = {};
  return {
    on: function (eventName, handler) {
      _listeners[eventName] = _listeners[eventName] || [];
      _listeners[eventName].push(handler);
    },
    off: function (eventName, handler) {
      if (!_listeners[eventName]) {
        return;
      }
      
      util.removeFromArray(_listeners[eventName], handler);
    },
    fire: function () {
      let _args = [...arguments];
      let _eventName = _args[0];
      util.removeFromArray(_args, _eventName);
      (_listeners[_eventName] || []).forEach(handler => {
        handler.call(this, ..._args);
      });
    },
  }
})();