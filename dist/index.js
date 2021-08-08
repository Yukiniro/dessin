(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.zCanvas = factory());
}(this, (function () { 'use strict';

  var constant = {
    ARGUMENT_ERROR: 'ARGUMENT_ERROR',

    MOUSE_DOWN: 'MOUSE_DOWN',
    MOUSE_UP: 'MOUSE_UP',
    MOUSE_MOVE: 'MOUSE_MOVE',
    MOUSE_DRAG: 'MOUSE_DRAG',
    MOUSE_DROP: 'MOUSE_DROP',
    MOUSE_HOVER: 'MOUSE_HOVER',

    SPRITE_TYPE_TEXT: 'TEXT',
    SPRITE_TYPE_PATH: 'PATH',
    SPRITE_TYPE_IMAGE: 'IMAGE',
    SPRITE_TYPE_RECT: 'RECT',
    SPRITE_TYPE_POLYGON: 'POLYGON',
    SPRITE_TYPE_CIRCLE: 'CIRCLE',
    SPRITE_TYPE_ELLIPSE: 'ELLIPSE',
    SPRITE_TYPE_LINE: 'LINE',

    LEFT_TOP: 'LEFT_TOP',
    CENTER_TOP: 'CENTER_TOP',
    RIGHT_TOP: 'RIGHT_TOP',
    RIGHT_CENTER: 'RIGHT_CENTER',
    RIGHT_BOTTOM: 'RIGHT_BOTTOM',
    CENTER_BOTTOM: 'CENTER_BOTTOM',
    LEFT_BOTTOM: 'LEFT_BOTTOM',
    LEFT_CENTER: 'LEFT_CENTER',
    CENTER: 'CENTER',
    ROTATE: 'ROTATE',
    NONE: 'NONE',
    SELF: "SELF",
  };

  var util = (function () {
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
        let { width, fontBoundingBoxAscent, fontBoundingBoxDescent } =
          ctx.measureText(value);
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
        }

        return point;
      },
    };
  })();

  var collection = (function () {
    let _items = [];
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
    };
  })();

  var observableMixin = (function () {
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

  var event = (function () {
    let _view = null;
    let _owner = null;
    let _isMouseDown = false;
    let _isMouseDrag = false;

    function onMouseDown(e) {
      _isMouseDown = true;
      _owner.fireEvent(constant.MOUSE_DOWN, e);
      util.addEventListener(document.body, 'mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      let { MOUSE_HOVER, MOUSE_DRAG, MOUSE_MOVE } = constant;
      _owner.fireEvent(MOUSE_MOVE, e);
      if (_isMouseDown) {
        _owner.fireEvent(MOUSE_DRAG, e);
        _isMouseDrag = true;
      } else {
        _owner.fireEvent(MOUSE_HOVER, e);
      }
    }

    function onMouseUp(e) {
      let { MOUSE_UP, MOUSE_DROP } = constant;
      _owner.fireEvent(MOUSE_UP, e);
      if (_isMouseDrag) {
        _owner.fireEvent(MOUSE_DROP, e);
        _isMouseDrag = false;
      }
      _isMouseDown = false;
      util.removeEventListener(document.body, 'mouseup', onMouseUp);
    }

    function bindEvent() {
      util.addEventListener(_view, 'mousedown', onMouseDown);
      util.addEventListener(_view, 'mousemove', onMouseMove);
    }

    function unbindEvent() {
      util.removeEventListener(_view, 'mousedown', onMouseDown);
      util.removeEventListener(_view, 'mousemove', onMouseMove);
    }

    return {
      /**
       * @description 绑定视图及事件
       * @param {*} owner
       * @param {*} view
       */
      bindView: function (owner, view) {
        if (_view) {
          unbindEvent();
        }
        _view = view;
        _owner = owner;
        bindEvent();
      },
    };
  })();

  class Canvas {

    constructor(props = {}) {
      this._lowerCanvas = props && props.canvas; // 渲染视图
      this._upperCanvas = document.createElement('canvas'); // 事件响应、辅助线视图
      this._size = {width: 500, height: 500};
      this._viewResponse = 1; // 实际渲染与最终成像之间的比例关系

      this._initView();
      this._updateView();
    }

    /**
     * @description 初始化视图
     */
    _initView() {
      let parent = this._lowerCanvas.parentNode;
      let parentPositionStyle = parent.style.position;
      parent.insertBefore(this._upperCanvas, this._lowerCanvas.nextSibling);
      if (!parentPositionStyle || parentPositionStyle === 'static') {
        util.css(parent, {position: 'relative'});
      }
      util.css(this._lowerCanvas, {
        position: 'absolute',
      });
      util.css(this._upperCanvas, {
        position: 'absolute',
      });
      event.bindView(this, this._upperCanvas);
    }

    /**
     * @description 更新视图尺寸
     */
    _updateView() {
      let {width, height} = this._size;
      this._lowerCanvas.width = width;
      this._lowerCanvas.height = height;
      this._upperCanvas.width = width;
      this._upperCanvas.height = height;

      this.render();
    }

    /**
     * @description 清空画布
     */
    _clear() {
      let {width, height} = this.getSize();
      this._lowerCanvas.getContext('2d').clearRect(0, 0, width, height);
    }

    /**
     * @description 渲染
     */
    render() {
      this.forEachItem((sprite) => {
        sprite.render(this._lowerCanvas.getContext('2d'));
        sprite.renderTrack(this._upperCanvas.getContext('2d'));
      });
    }

    /**
     * @description 返回返回尺寸
     * @returns {object} size
     * @returns {number} size.widht
     * @returns {number} size.height
     */
    getSize() {
      return this._size;
    }

    /**
     * @description 设置视图尺寸
     * @param {object} size 
     * @param {number} size.width
     * @param {number} size.height 
     * @returns 
     */
    setSize(size) {
      this._size = {...size};
      this._updateView();
      return this;
    }
  }

  util.mixin(Canvas.prototype, collection);
  util.mixin(Canvas.prototype, observableMixin);

  var config = {
    perPixel: 1,
  };

  const TRACK_NODES = {
    LEFT_TOP: 0,
    CENTER_TOP: 1,
    RIGHT_TOP: 2,
    RIGHT_CENTER: 3,
    RIGHT_BOTTOM: 4,
    CENTER_BOTTOM: 5,
    LEFT_BOTTOM: 6,
    LEFT_CETNER: 7,
    SELF: 8,
    ROTATE: 9,
    NONE: -1,
  };

  class Track {

    constructor(props = {}) {
      this._supportNodes = this.computedValue('_supportNodes', props.supportNodes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1]);
      this._lineColor = this.computedValue('_lineColor', props.lineColor, '#08b9ff');
      this._nodeColor = this.computedValue('_nodeColor', props.nodeColor, '#adadad');
      this._nodeRadius = this.computedValue('_nodeRadius', props.nodeRadius, 4);
      this._rotateNodeOffset = 10;
      this._cacheView = document.createElement('canvas');
      this._cacheCtx = this._cacheView.getContext('2d');
    }

    static TRACK_NODES() {
      return TRACK_NODES;
    }

    computedValue(key, value, defalultValue) {
      const {isUndefined} = util;
      return isUndefined(value) ? defalultValue : value;
    }

    /**
     * @description 渲染缓存
     * @param {number} width 
     * @param {number} height 
     */
    renderCache(width, height) {
      this._cacheView.width = width;
      this._cacheView.height = height;
      this._cacheCtx.save();
      this._cacheCtx.strokeStyle = this._lineColor;
      this._cacheCtx.strokeRect(this._nodeRadius, this._nodeRadius, width - this._nodeRadius * 2, height - this._nodeRadius * 2);
      this._cacheCtx.restore();
      this._renderNodes(width, height);
    }

    /**
     * @description 渲染控制器
     * @param {context} ctx 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    render(ctx, x, y, width, height) {
      let rect = {
        x: x - this._nodeRadius,
        y: y - this._nodeRadius,
        width: width + this._nodeRadius * 2,
        height: height + this._nodeRadius * 2,
      };
      this.renderCache(width, height);
      ctx.drawImage(this._cacheView, rect.x, rect.y, rect.width, rect.height);
    }

    /**
     * @description 渲染所有控制点
     * @param {number} width 
     * @param {number} height 
     */
    _renderNodes(width, height) {
      this._supportNodes.forEach(node => {
        let point = { x: 0, y: 0 };
        let rect = {
          x: this._nodeRadius, 
          y: this._nodeRadius, 
          width: width - this._nodeRadius * 2,
          height: height - this._nodeRadius * 2,
        };
        switch (node) {
          case 0:
            point = util.calePointInRect(constant.LEFT_TOP, rect);
            break;
          case 1:
            point = util.calePointInRect(constant.CENTER_TOP, rect);
            break;
          case 2:
            point = util.calePointInRect(constant.RIGHT_TOP, rect);
            break;
          case 3:
            point = util.calePointInRect(constant.RIGHT_CENTER, rect);         
            break;
          case 4:
            point = util.calePointInRect(constant.RIGHT_BOTTOM, rect);          
            break;
          case 5:
            point = util.calePointInRect(constant.CENTER_BOTTOM, rect);          
            break;
          case 6:
            point = util.calePointInRect(constant.LEFT_BOTTOM, rect);          
            break;
          case 7:
            point = util.calePointInRect(constant.LEFT_CENTER, rect);          
            break;
          case 9:
            point = { x: width / 2, y: this._nodeRadius - this._rotateNodeOffset };
            break;
        }
        this._renderNode(point);
      });
    }

    /**
     * @description 渲染控制点
     * @param {object} point 
     * @param {number} point.x
     * @param {number} point.y
     */
    _renderNode(point) {
      this._cacheCtx.save();
      this._cacheCtx.fillStyle = this._nodeColor;
      this._cacheCtx.beginPath();
      this._cacheCtx.arc(point.x, point.y, this._nodeRadius, 0, Math.PI * 2);
      this._cacheCtx.fill();
      this._cacheCtx.restore();
    }
  }

  class Sprite {
    constructor(props = {}) {
      this._type = this.computedValue('_type', props.type, '');
      this._x = this.computedValue('_x', props.x, 0);
      this._y = this.computedValue('_y', props.y, 0);
      this._width = this.computedValue('_width', props.width, 0);
      this._height = this.computedValue('_height', props.height, 0);
      this._angle = this.computedValue('_angle', props.angle, 0);
      this._originX = this.computedValue('_originX', props.originX, 0);
      this._originY = this.computedValue('_originY', props.originY, 0);
      this._flipX = this.computedValue('_flipX', props.flipX, 1);
      this._flipY = this.computedValue('_flipY', props.flipY, 0);
      this._opacity = this.computedValue('_opacity', props.opacity, 1);
      this._value = this.computedValue('_value', props.value, '');
      this._supportNodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1];
      this._selected = false;
      this._cacheView = document.createElement('canvas');
      this._cacheCtx = this._cacheView.getContext('2d');
      this._track = null;
    }

    encode() {
      return {
        type: this.type,
        x: this.getX(),
        y: this.getY(),
        width: this.getWidth(),
        hieght: this.getHeight(),
        angle: this.getAngle(),
        originX: this.getOriginX(),
        originY: this.getOriginY(),
        flipX: this.getFlipX(),
        flipY: this.getFlipY(),
        opacity: this.getOpacity(),
        value: this.getValue(),
      };
    }

    decode(data) {
      this._type = this.computedValue('_type', data.type, this.getType());
      this._x = this.computedValue('_x', data.x, this.getX());
      this._y = this.computedValue('_y', data.y, this.getY());
      this._width = this.computedValue('_width', data.width, this.getWidth());
      this._height = this.computedValue('_height', data.height, this.getHeight());
      this._angle = this.computedValue('_angle', data.angle, this.getAngle());
      this._originX = this.computedValue(
        '_originX',
        data.originX,
        this.getOriginX()
      );
      this._originY = this.computedValue(
        '_originY',
        data.originY,
        this.getOriginY()
      );
      this._flipX = this.computedValue('_flipX', data.flipX, this.getFlipY());
      this._flipY = this.computedValue('_flipY', data.flipY, this.getFlipY());
      this._opacity = this.computedValue(
        '_opacity',
        data.opacity,
        this.getOpacity()
      );
      this._value = this.computedValue('_value', data.value, this.getValue());
    }

    computedValue(key, value, defalultValue) {
      return util.isUndefined(value) ? defalultValue : value;
    }

    /**
     * @description 返回类型
     */
    get type() {
      return this._type;
    }

    /**
     * @description 返回类型
     * @returns
     */
    getValue() {
      return this._value;
    }

    /**
     * @description 设置属性
     * @param {*} value
     * @returns
     */
    setValue(value) {
      this._value = value;
      return this;
    }

    /**
     * @description 返回宽度
     * @returns {number}
     */
    getWidth() {
      return this._width;
    }

    /**
     * @description 设置宽度
     * @param {number} width
     * @returns
     */
    setWidth(width) {
      this._width = width;
      return this;
    }

    /**
     * @description 返回高度
     * @returns {number}
     */
    getHeight() {
      return this._height;
    }

    /**
     * @description 设置高度
     * @param {number} height
     * @returns
     */
    setHeight(height) {
      this._height = height;
      return this;
    }

    /**
     * @description 返回尺寸信息
     * @returns {object} size
     * @returns {number} size.width
     * @returns {number} size.height
     */
    getSize() {
      return { width: this._width, height: this._height };
    }

    /**
     * @description 设置尺寸
     * @param {object} size
     * @param {number} size.width
     * @param {number} size.height
     * @returns
     */
    setSize(size) {
      const { isUndefined, isObject } = util;
      if (!isObject(size)) throw new Error(constant.ARGUMENT_ERROR);
      if (!isUndefined(size.width)) this._width = size.width;
      if (!isUndefined(size.height)) this._height = size.height;
      return this;
    }

    /**
     * @description 返回x轴坐标
     * @returns {number}
     */
    getX() {
      return this._x;
    }

    /**
     * @description 设置x轴坐标
     * @param {number} x
     * @returns
     */
    setX(x) {
      this._x = x;
      return this;
    }

    /**
     * @description 返回y轴坐标
     * @returns {number} y
     */
    getY() {
      return this._y;
    }

    /**
     * @description 设置y轴坐标
     * @param {number} y
     * @returns
     */
    setY(y) {
      this._y = y;
      return this;
    }

    /**
     * @description 返回坐标
     * @returns {object} position
     * @returns {number} position.x
     * @returns {number} position.y
     */
    getPos() {
      return { x: this._x, y: this._y };
    }

    /**
     * @description 设置坐标
     * @param {object} position
     * @param {number} position.x
     * @param {number} position.y
     * @returns
     */
    setPos(position) {
      const { isObject, isUndefined } = util;
      if (!isObject(position)) throw new Error(constant.ARGUMENT_ERROR);
      if (!isUndefined(position.x)) this._x = position.x;
      if (!isUndefined(position.y)) this._y = position.y;
      return this;
    }

    /**
     * @description 返回透明度
     * @returns {number}
     */
    getOpacity() {
      return this._opacity;
    }

    /**
     * @description 设置透明度
     * @param {number} opacity
     */
    setOpacity(opacity) {
      this._opacity = opacity;
      return this;
    }

    /**
     * @description 返回锚点x轴坐标
     * @returns {number}
     */
    getOriginX() {
      return this._originX;
    }

    /**
     * @description 设置锚点x轴坐标
     * @param {number} originX
     * @returns
     */
    setOriginX(originX) {
      this._originX = originX;
      return this;
    }

    /**
     * @description 返回锚点y轴坐标
     * @returns
     */
    getOriginY() {
      return this._originY;
    }

    /**
     * @description 设置锚点y轴坐标
     * @param {*} originY
     * @returns
     */
    setOriginY(originY) {
      this._originY = originY;
      return this;
    }

    /**
     * @description 返回锚点坐标
     * @returns {object} origin
     * @returns {number} origin.x
     * @returns {number} origin.y
     */
    getOrigin() {
      return { x: this._originX, y: this._originY };
    }

    /**
     * @description 设置锚点坐标
     * @param {object} origin
     * @param {number} origin.x
     * @param {number} origin.y
     * @returns
     */
    setOrigin(origin) {
      const { isObject, isUndefined } = util;
      if (!isObject(origin)) throw new Error(constant.ARGUMENT_ERROR);
      if (!isUndefined(origin.x)) this._originX = origin.x;
      if (!isUndefined(origin.y)) this._originY = origin.y;
      return this;
    }

    /**
     * @description 返回旋转角度
     * @returns {number}
     */
    getAngle() {
      return this._angle;
    }

    /**
     * @description 设置旋转角度
     * @param {number} angle
     * @returns
     */
    setAngle(angle) {
      this._angle = angle;
      return this;
    }

    /**
     * @description 返回水平翻转
     * @returns
     */
    getFlipX() {
      return this._flipX;
    }

    /**
     * @description 设置水平翻转
     * @param {number} x
     * @returns
     */
    setFlipX(x) {
      this._flipX = x;
      return this;
    }

    /**
     * @description 返回垂直翻转
     * @returns
     */
    getFlipY() {
      return this._flipY;
    }

    /**
     * @description 设置垂直翻转
     * @param {number} y
     * @returns
     */
    setFlipY(y) {
      this._flipY = y;
      return this;
    }

    /**
     * @description 返回是否选中
     * @returns {boolean}
     */
    isSelected() {
      return this._selected;
    }

    /**
     * @description 选中元素
     * @returns
     */
    select() {
      this._selected = true;
      return this;
    }

    /**
     * @description 取消元素选中
     * @returns
     */
    deselect() {
      this._selected = false;
      return this;
    }

    /**
     * @description 渲染缓存
     */
    renderCache() {}

    /**
     * @description 渲染元素
     */
    render() {}

    /**
     * @description 渲染控制器
     * @param {*} ctx
     */
    renderTrack(ctx) {
      this._track =
        this._track || new Track({ supportNodes: this._supportNodes });
      this._track.render(ctx, this._x, this._y, this._width, this._height);
    }
  }

  util.mixin(Sprite.prototype, observableMixin);

  class Text extends Sprite {
    constructor(props = {}) {
      super(props);
      this._type = constant.SPRITE_TYPE_TEXT;
      this._fontSize = this.computedValue('_fontSize', props.fontSize, 36);
      this._fontStyle = this.computedValue(
        '_fontStyle',
        props.fontStyle,
        'normal'
      );
      this._fontWeight = this.computedValue(
        '_fontWeight',
        props.fontWeight,
        'normal'
      );
      this._fontFamily = this.computedValue(
        '_fontFamily',
        props.fontFamily,
        'sans-serif'
      );
      this._textAlign = this.computedValue(
        '_textAlign',
        props.textAlign,
        'center'
      );
      this._lineHeight = this.computedValue('_lineHeight', props.lineHeight, 1.2);
      this._fillColor = this.computedValue(
        '_fillColor',
        props.fillColor,
        '#FFFFFF'
      );
      this._strokeColor = this.computedValue(
        '_strokeColor',
        props.strokeColor,
        '#FFFFFF'
      );
      this._value = this.computedValue('_value', props.value, [
        'Enter Your Text',
      ]);
      this._supportNodes = [0, 2, 4, 6];
      this._fontBoundingBoxAscent = 0;

      this.initSize();
      this.renderCache();
    }

    encode() {
      return {
        ...super.encode(),
        fontSize: this.getFontSize(),
        fontStyle: this.getFontStyle(),
        fontWeight: this.getFontWeight(),
        fontFamily: this.getFontFamily(),
        textAlign: this.getTextAlign(),
        lienHeight: this.getLineHeight(),
      };
    }

    decode(data) {
      super.decode(data);
      this._fontSize = this.computedValue(
        '_fontSize',
        data.fontSize,
        this.getFontSize()
      );
      this._fontStyle = this.computedValue(
        '_fontStyle',
        data.fontStyle,
        this.getFontStyle()
      );
      this._fontWeight = this.computedValue(
        '_fontWeight',
        data.fontWeight,
        this.getFontWeight()
      );
      this._textAlign = this.computedValue(
        '_textAlgin',
        data.textAlign,
        this.getTextAlign()
      );
      this._lineHeight = this.computedValue(
        '_lineHeight',
        data.lineHeight,
        this.getLineHeight()
      );

      this.initSize();
      this.renderCache();
    }

    /**
     * @description 计算元素尺寸
     * @returns {object} info
     * @returns {number} info.width
     * @returns {number} info.height
     * @returns {number} info.fontBoundingBoxAscent
     */
    _calcSize() {
      return this._value.reduce(
        (finalValue, text) => {
          let opstions = {
            fontSize: this._fontSize,
            fontFamily: this._fontFamily,
            fontStyle: this._fontStyle,
            fontWeight: this._fontWeight,
          };
          let { width, height, fontBoundingBoxAscent } = util.calcTextSize(
            this._cacheCtx,
            text,
            opstions
          );
          return {
            width: Math.max(width, finalValue.width),
            height: height + finalValue.height,
            fontBoundingBoxAscent,
          };
        },
        { width: 0, height: 0, fontBoundingBoxAscent: 0 }
      );
    }

    /**
     * @description 返回字号
     * @returns
     */
    getFontSize() {
      return this._fontSize;
    }

    /**
     * @description 设置字号
     * @param {number} fontSize
     * @returns
     */
    setFontSize(fontSize) {
      this._fontSize = fontSize;
      return this;
    }

    /**
     * @description 返回字体样式
     * @returns
     */
    getFontStyle() {
      return this._fontStyle;
    }

    /**
     * @description 设置字体样式
     * @param {string} fontStyle
     * @returns
     */
    setFontStyle(fontStyle) {
      this._fontStyle = fontStyle;
      return this;
    }

    /**
     * @description 返回字体粗细
     * @returns {string|number}
     */
    getFontWeight() {
      return this._fontWeight;
    }

    /**
     * @description 设置字体粗细
     * @param {string|number} fontWeight
     * @returns
     */
    setFontWeight(fontWeight) {
      this._fontWeight = fontWeight;
      return this;
    }

    /**
     * @description 返回字体
     * @returns {string}
     */
    getFontFamily() {
      return this._fontFamily;
    }

    /**
     * @description 设置字体
     * @param {string} fontFamily
     * @returns
     */
    setFontFamily(fontFamily) {
      this._fontFamily = fontFamily;
      return this;
    }

    /**
     * @description 返回文字对齐
     * @returns {string}
     */
    getTextAlign() {
      return this._textAlign;
    }

    /**
     * @description 设置文字对齐
     * @param {string} textAlign
     * @returns
     */
    setTextAlign(textAlign) {
      this._textAlign = textAlign;
      return this;
    }

    /**
     * @description 返回文字行高
     * @returns {number}
     */
    getLineHeight() {
      return this._lineHeight;
    }

    /**
     * @description 设置文字行高
     * @param {number} lineHeight
     * @returns
     */
    setLineHeight(lineHeight) {
      this._lineHeight = lineHeight;
      return this;
    }

    /**
     * @description 返回填充颜色
     * @returns {string}
     */
    getFillColor() {
      return this._fillColor;
    }

    /**
     * @description 设置填充颜色
     * @param {*} color
     * @returns
     */
    setFillColor(color) {
      this._fillColor = color;
      return this;
    }

    /**
     * @description 返回边框颜色
     * @returns
     */
    getStrokeColor() {
      return this._strokeColor;
    }

    /**
     * @description 设置边框颜色
     * @param {string} color
     * @returns
     */
    setStrokeColor(color) {
      this._strokeColor = color;
      return this;
    }

    /**
     * @description 初始化尺寸
     */
    initSize() {
      let { width, height, fontBoundingBoxAscent } = this._calcSize();
      this.setSize({ width, height });
      this._fontBoundingBoxAscent = fontBoundingBoxAscent;
    }

    renderCache() {
      let { perPixel } = config;
      let x = 0;
      let y = 0;
      let width = this._width * perPixel;
      let height = this._height * perPixel;
      let fontSize = this._fontSize * perPixel;
      switch (this._textAlign) {
        case 'left':
          break;
        case 'center':
          x = width / 2;
          break;
        case 'right':
          x = width;
          break;
      }
      this._cacheView.width = width;
      this._cacheView.height = height;
      this._cacheCtx.font = `${this._fontStyle} ${this._fontWeight} ${fontSize}px ${this._fontFamily}`;
      this._cacheCtx.fillStyle = this._fillColor;
      this._cacheCtx.strokeStyle = this._strokeColor;
      // this._cacheCtx.textBaseline = 'top';
      this._cacheCtx.textAlign = this._textAlign;
      this._value.forEach((text, index) => {
        y = index * this._lineHeight * fontSize + this._fontBoundingBoxAscent;
        this._cacheCtx.fillText(text, x, y);
      });
    }

    render(ctx) {
      ctx.drawImage(this._cacheView, this._x, this._y, this._width, this._height);
    }
  }

  var index = {
    Canvas,
    Text,
  };

  return index;

})));
