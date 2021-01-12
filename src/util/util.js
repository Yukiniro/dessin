import constant from "../constant/constant";

export default (function () {

  return {

    /**
     * @description 判断是否为定义
     * @param {*} source 
     */
    isUndefined: function (source) {
      return typeof source === 'undefined';
    },

    /**
     * @description 判断是否为对象
     * @param {*} source 
     */
    isObject: function (source) {
      return typeof source === 'object' && source !== null;
    },

    /**
     * @description 深拷贝
     * @param {*} source 
     */
    deepClone: function (source) {
      if (this.isObject(source)) {
        if (Array.isArray(source)) {
          return source.map(item => this.deepClone(item));
        } else {
          let result = {};
          for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              result[key] = this.deepClone(source[key]);
            }
          }
          return result;
        }
      } else {
        return source;
      }
    },

    /**
     * @description 混入
     * @param {*} target 
     * @param {*} source 
     */
    mixin: function (target, source) {
      return Object.assign(target, this.deepClone(source));
    },

    /**
     * @description 移除指定数组中的指定项
     * @param array
     * @param item
     */
    removeFromArray: function (array, item) {
      if (!Array.isArray(array)) {
        throw constant.ARGUMENT_ERROR;
      }
      let index = array.indexof(item);
      if (index !== -1) {
        array.splice(index, 1);
      }
    },

    /**
     * @description 绑定DOM事件
     * @param {*} target 
     * @param {*} eventName 
     * @param {*} handler 
     */
    addEventListener: function (target, eventName, handler) {
      if (!target) {
        throw new Error(constant.ARGUMENT_ERROR);
      }

      if (target.addEventListener) {
        target.addEventListener(eventName, handler);
      } else if (target.attachEvent) {
        target.attachEvent(`on${eventName}`, handler);
      }
    },

    /**
     * @description 解绑DOM事件
     * @param {*} target 
     * @param {*} eventName 
     * @param {*} handler 
     */
    removeEventListener: function (target, eventName, handler) {
      if (!target) {
        throw new Error(constant.ARGUMENT_ERROR);
      }

      if (target.removeEventListener) {
        target.removeEventListener(eventName, handler);
      } else if (target.detachEvent) {
        target.detachEvent(eventName, handler);
      }
    },
  }
})();