import constant from '../constant/constant';

export default (function () {
  const { hasOwnProperty } = Object.prototype;

  return {
    /**
     * @description 判断是否未定义
     * @param {*} source
     */
    isUndefined: function (source) {
      return source === void 0;
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
          return source.map((item) => this.deepClone(item));
        } else {
          let result = {};
          for (let key in source) {
            if (hasOwnProperty.call(source, key)) {
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

    /**
     * @description 设置元素的css
     * @param {*} element
     * @param {*} style
     */
    css: function (element, style) {
      for (let key in style) {
        if (hasOwnProperty.call(style, key)) {
          element.style[key] = style[key];
        }
      }
    },

    /**
     * @description 计算文本的尺寸
     * @param {*} ctx
     * @param {stiring} value
     * @param {object} options
     * @param {number} options.fontSize
     * @param {string} options.fontFamily
     * @param {string} options.fontStyle
     * @param {string} options.fontWeight
     * @returns
     */
    calcTextSize: function (ctx, value, options = {}) {
      let { fontSize, fontFamily, fontStyle, fontWeight } = options;
      ctx.save();
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
      let { width, fontBoundingBoxAscent, fontBoundingBoxDescent } = ctx.measureText(value);
      ctx.restore();
      return {
        width,
        height: fontBoundingBoxAscent + fontBoundingBoxDescent,
        fontBoundingBoxAscent,
      };
    },

    /**
     * @description 渲染线
     * @param {*} ctx
     * @param {object} startPos
     * @param {number} startPos.x
     * @param {number} startPos.y
     * @param {object} endPos
     * @param {number} endPos.x
     * @param {number} endPos.y
     * @param {string} color
     * @param {object} options
     * @param {array} options.dash 虚线数据，[]为实线
     */
    renderLine: function (ctx, startPos, endPos, color, options) {
      let { x: startX, y: startY } = startPos;
      let { x: endX, y: endY } = endPos;
      let dash = (options && options.dash) || [];
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.setLineDash(dash);
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.restore();
    },

    /**
     * @description 计算rect中点的位置
     * @param {*} type
     * @param {*} rect
     * @returns
     */
    calePointInRect: function (type, rect) {
      let { x, y, width, height } = rect;
      let point = { x: 0, y: 0 };
      switch (type) {
        case constant.LEFT_TOP:
          point = { x, y };
          break;
        case constant.CENTER_TOP:
          point = { x: x + width / 2, y };
          break;
        case constant.RIGHT_TOP:
          point = { x: x + width, y };
          break;
        case constant.RIGHT_CENTER:
          point = { x: x + width, y: y + height / 2 };
          break;
        case constant.RIGHT_BOTTOM:
          point = { x: x + width, y: y + height };
          break;
        case constant.CENTER_BOTTOM:
          point = { x: x + width / 2, y: y + height };
          break;
        case constant.LEFT_BOTTOM:
          point = { x, y: y + height };
          break;
        case constant.LEFT_CENTER:
          point = { x, y: y + height / 2 };
          break;
        case constant.CENTER:
          point = { x: x + width / 2, y: y + height / 2 };
          break;
        default:
      }

      return point;
    },

    /**
     * @description 空函数
     */
    emptyFunc: function () {},

    /**
     * @description 判断点是否在框内
     * @param {object} point
     * @param {number} point.x
     * @param {number} point.y
     * @param {object} rect
     * @param {number} rect.x
     * @param {number} rect.y
     * @param {number} rect.width
     * @param {number} rect.height
     * @param {number} angle
     * @returns {boolean}
     */
    isPointInRect: function (point, rect, angle = 0) {
      const { x: px, y: py } = point;
      const { x, y, width, height } = rect;
      return px >= x && px <= x + width && py >= y && py <= y + height;
    },

    /**
     * @description 计算鼠标位置
     * @param {MouseEvent} mouseEvent
     * @returns
     */
    calcCursorPoint: function (mouseEvent) {
      return {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
      };
    },

    /**
     * @description 计算两点之间的距离
     * @param {object} point1
     * @param {number} point1.x
     * @param {number} point1.y
     * @param {object} point2
     * @param {number} point2.x
     * @param {number} point2.y
     * @returns
     */
    calcDistance: function (point1, point2) {
      const { x: x1, y: y1 } = point1;
      const { x: x2, y: y2 } = point2;
      const offsetX = Math.abs(x2 - x1);
      const offsetY = Math.abs(y2 - y1);
      return Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
    },

    /**
     * @description 计算point2相对于point1的向量
     * @param {object} point1
     * @param {number} point1.x
     * @param {number} point1.y
     * @param {object} point2
     * @param {number} point2.x
     * @param {number} point2.y
     * @returns
     */
    calcVertor: function (point1, point2) {
      const { x: x1, y: y1 } = point1;
      const { x: x2, y: y2 } = point2;
      return {
        x: x2 - x1,
        y: y2 - y1,
      };
    },

    /**
     * @description 清楚指定画布
     * @param {*} canvas
     */
    clearCanvas: function (canvas) {
      canvas.width = canvas.width;
      canvas.height = canvas.height;
    },

    /**
     * @description 角度转弧度
     * @param {number} angle
     * @returns
     */
    angleToRadian: function (angle) {
      return (angle / 180) * Math.PI;
    },

    /**
     * @description 弧度转角度
     * @param {number} radian
     * @returns
     */
    radianToAngle: function (radian) {
      return (radian / Math.PI) * 180;
    },

    /**
     * @description 保留指定位数小数点
     * @param {number} value
     * @param {number} digits
     * @returns
     */
    toFixed: function (value, digits) {
      return Number(Number(value).toFixed(digits));
    },

    /**
     * @description 限定角度值在0 -- 360之间
     * @param {number} angle 
     * @returns 
     */
    fixAngle(angle) {
      let value = angle;
      while (value < 0 || value > 360) {
        if (value < 0) value += 360;
        if (value > 360) value -= 360;
      }
      return value;
    }
  };
})();
