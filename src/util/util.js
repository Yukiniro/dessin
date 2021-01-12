import constant from "../constant/constant";

export default (function () {

  return {

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
  }
})();