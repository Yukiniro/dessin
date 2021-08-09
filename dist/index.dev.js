(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.zCanvas = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

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
    SELF: "SELF"
  };

  var util = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    return {
      /**
       * @description 判断是否未定义
       * @param {*} source
       */
      isUndefined: function isUndefined(source) {
        return source === void 0;
      },

      /**
       * @description 判断是否为对象
       * @param {*} source
       */
      isObject: function isObject(source) {
        return _typeof(source) === 'object' && source !== null;
      },

      /**
       * @description 深拷贝
       * @param {*} source
       */
      deepClone: function deepClone(source) {
        var _this = this;

        if (this.isObject(source)) {
          if (Array.isArray(source)) {
            return source.map(function (item) {
              return _this.deepClone(item);
            });
          } else {
            var result = {};

            for (var key in source) {
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
      mixin: function mixin(target, source) {
        return Object.assign(target, this.deepClone(source));
      },

      /**
       * @description 移除指定数组中的指定项
       * @param array
       * @param item
       */
      removeFromArray: function removeFromArray(array, item) {
        if (!Array.isArray(array)) {
          throw constant.ARGUMENT_ERROR;
        }

        var index = array.indexof(item);

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
      addEventListener: function addEventListener(target, eventName, handler) {
        if (!target) {
          throw new Error(constant.ARGUMENT_ERROR);
        }

        if (target.addEventListener) {
          target.addEventListener(eventName, handler);
        } else if (target.attachEvent) {
          target.attachEvent("on".concat(eventName), handler);
        }
      },

      /**
       * @description 解绑DOM事件
       * @param {*} target
       * @param {*} eventName
       * @param {*} handler
       */
      removeEventListener: function removeEventListener(target, eventName, handler) {
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
      css: function css(element, style) {
        for (var key in style) {
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
      calcTextSize: function calcTextSize(ctx, value) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var fontSize = options.fontSize,
            fontFamily = options.fontFamily,
            fontStyle = options.fontStyle,
            fontWeight = options.fontWeight;
        ctx.save();
        ctx.font = "".concat(fontStyle, " ").concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);

        var _ctx$measureText = ctx.measureText(value),
            width = _ctx$measureText.width,
            fontBoundingBoxAscent = _ctx$measureText.fontBoundingBoxAscent,
            fontBoundingBoxDescent = _ctx$measureText.fontBoundingBoxDescent;

        ctx.restore();
        return {
          width: width,
          height: fontBoundingBoxAscent + fontBoundingBoxDescent,
          fontBoundingBoxAscent: fontBoundingBoxAscent
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
      renderLine: function renderLine(ctx, startPos, endPos, color, options) {
        var startX = startPos.x,
            startY = startPos.y;
        var endX = endPos.x,
            endY = endPos.y;
        var dash = options && options.dash || [];
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
      calePointInRect: function calePointInRect(type, rect) {
        var x = rect.x,
            y = rect.y,
            width = rect.width,
            height = rect.height;
        var point = {
          x: 0,
          y: 0
        };

        switch (type) {
          case constant.LEFT_TOP:
            point = {
              x: x,
              y: y
            };
            break;

          case constant.CENTER_TOP:
            point = {
              x: x + width / 2,
              y: y
            };
            break;

          case constant.RIGHT_TOP:
            point = {
              x: x + width,
              y: y
            };
            break;

          case constant.RIGHT_CENTER:
            point = {
              x: x + width,
              y: y + height / 2
            };
            break;

          case constant.RIGHT_BOTTOM:
            point = {
              x: x + width,
              y: y + height
            };
            break;

          case constant.CENTER_BOTTOM:
            point = {
              x: x + width / 2,
              y: y + height
            };
            break;

          case constant.LEFT_BOTTOM:
            point = {
              x: x,
              y: y + height
            };
            break;

          case constant.LEFT_CENTER:
            point = {
              x: x,
              y: y + height / 2
            };
            break;

          case constant.CENTER:
            point = {
              x: x + width / 2,
              y: y + height / 2
            };
            break;
        }

        return point;
      }
    };
  })();

  var collection = (function () {
    var _items = [];
    return {
      /**
       * @descrition 添加某个元素
       * @param {*} item
       */
      add: function add(item) {
        if (!_items.includes(item)) {
          _items.push(item);
        }
      },

      /**
       * @description 移除某个元素
       * @param {*} item
       */
      remove: function remove(item) {
        util.removeFromArray(_items, item);
      },

      /**
       * @description 对每个元素调用handler
       * @param {*} handler
       */
      forEachItem: function forEachItem(handler) {
        var _this = this;

        _items.forEach(function (item, index) {
          handler.call(_this, item, index);
        });
      },

      /**
       * @description 返回当前元素个数
       */
      size: function size() {
        return _items.length;
      },

      /**
       * @description 移除所有元素
       */
      removeAll: function removeAll() {
        _items.length = 0;
      },

      /**
       * @description 插入某个元素
       * @param {*} item
       * @param {number} index
       */
      inserAt: function inserAt(item, index) {
        _items.splice(index, 0, item);
      },

      /**
       * @description 集合是否包含某个元素
       * @param {*} item
       */
      includes: function includes(item) {
        return _items.includes(item);
      }
    };
  })();

  var observableMixin = (function () {
    var _listeners = {};
    return {
      /**
       * @description 绑定事件监听
       * @param {string} eventName 事件名
       * @param {callback} handler 回调函数
       */
      on: function on(eventName, handler) {
        _listeners[eventName] = _listeners[eventName] || [];

        _listeners[eventName].push(handler);
      },

      /**
       * @description 解绑事件监听
       * @param {string} eventName 事件名
       * @param {callback} handler 回调函数
       */
      off: function off(eventName, handler) {
        if (!_listeners[eventName]) {
          return;
        }

        util.removeFromArray(_listeners[eventName], handler);
      },

      /**
       * @description 触犯事件
       */
      fire: function fire() {
        var _this = this;

        var _args = Array.prototype.slice.call(arguments);

        var _eventName = _args[0];
        util.removeFromArray(_args, _eventName);
        (_listeners[_eventName] || []).forEach(function (handler) {
          handler.call.apply(handler, [_this].concat(_toConsumableArray(_args)));
        });
      }
    };
  })();

  var event = (function () {
    var _view = null;
    var _owner = null;
    var _isMouseDown = false;
    var _isMouseDrag = false;

    function onMouseDown(e) {
      _isMouseDown = true;

      _owner.fireEvent(constant.MOUSE_DOWN, e);

      util.addEventListener(document.body, 'mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      var MOUSE_HOVER = constant.MOUSE_HOVER,
          MOUSE_DRAG = constant.MOUSE_DRAG,
          MOUSE_MOVE = constant.MOUSE_MOVE;

      _owner.fireEvent(MOUSE_MOVE, e);

      if (_isMouseDown) {
        _owner.fireEvent(MOUSE_DRAG, e);

        _isMouseDrag = true;
      } else {
        _owner.fireEvent(MOUSE_HOVER, e);
      }
    }

    function onMouseUp(e) {
      var MOUSE_UP = constant.MOUSE_UP,
          MOUSE_DROP = constant.MOUSE_DROP;

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
      bindView: function bindView(owner, view) {
        if (_view) {
          unbindEvent();
        }

        _view = view;
        _owner = owner;
        bindEvent();
      }
    };
  })();

  var Canvas = /*#__PURE__*/function () {
    function Canvas() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Canvas);

      this._lowerCanvas = props && props.canvas; // 渲染视图

      this._upperCanvas = document.createElement('canvas'); // 事件响应、辅助线视图

      this._size = {
        width: 500,
        height: 500
      };
      this._viewResponse = 1; // 实际渲染与最终成像之间的比例关系

      this._initView();

      this._updateView();
    }
    /**
     * @description 初始化视图
     */


    _createClass(Canvas, [{
      key: "_initView",
      value: function _initView() {
        var parent = this._lowerCanvas.parentNode;
        var parentPositionStyle = parent.style.position;
        parent.insertBefore(this._upperCanvas, this._lowerCanvas.nextSibling);

        if (!parentPositionStyle || parentPositionStyle === 'static') {
          util.css(parent, {
            position: 'relative'
          });
        }

        util.css(this._lowerCanvas, {
          position: 'absolute'
        });
        util.css(this._upperCanvas, {
          position: 'absolute'
        });
        event.bindView(this, this._upperCanvas);
      }
      /**
       * @description 更新视图尺寸
       */

    }, {
      key: "_updateView",
      value: function _updateView() {
        var _this$_size = this._size,
            width = _this$_size.width,
            height = _this$_size.height;
        this._lowerCanvas.width = width;
        this._lowerCanvas.height = height;
        this._upperCanvas.width = width;
        this._upperCanvas.height = height;
        this.render();
      }
      /**
       * @description 清空画布
       */

    }, {
      key: "_clear",
      value: function _clear() {
        var _this$getSize = this.getSize(),
            width = _this$getSize.width,
            height = _this$getSize.height;

        this._lowerCanvas.getContext('2d').clearRect(0, 0, width, height);
      }
      /**
       * @description 渲染
       */

    }, {
      key: "render",
      value: function render() {
        var _this = this;

        this.forEachItem(function (sprite) {
          sprite.render(_this._lowerCanvas.getContext('2d'));
          sprite.renderTrack(_this._upperCanvas.getContext('2d'));
        });
      }
      /**
       * @description 返回返回尺寸
       * @returns {object} size
       * @returns {number} size.widht
       * @returns {number} size.height
       */

    }, {
      key: "getSize",
      value: function getSize() {
        return this._size;
      }
      /**
       * @description 设置视图尺寸
       * @param {object} size 
       * @param {number} size.width
       * @param {number} size.height 
       * @returns 
       */

    }, {
      key: "setSize",
      value: function setSize(size) {
        this._size = _objectSpread2({}, size);

        this._updateView();

        return this;
      }
    }]);

    return Canvas;
  }();

  util.mixin(Canvas.prototype, collection);
  util.mixin(Canvas.prototype, observableMixin);

  var config = {
    perPixel: 1
  };

  var _TRACK_NODES = {
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
    NONE: -1
  };

  var Track = /*#__PURE__*/function () {
    function Track() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Track);

      this._supportNodes = this.computedValue('_supportNodes', props.supportNodes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1]);
      this._lineColor = this.computedValue('_lineColor', props.lineColor, '#08b9ff');
      this._nodeColor = this.computedValue('_nodeColor', props.nodeColor, '#adadad');
      this._nodeRadius = this.computedValue('_nodeRadius', props.nodeRadius, 4);
      this._rotateNodeOffset = 10;
      this._cacheView = document.createElement('canvas');
      this._cacheCtx = this._cacheView.getContext('2d');
    }

    _createClass(Track, [{
      key: "computedValue",
      value: function computedValue(key, value, defalultValue) {
        var isUndefined = util.isUndefined;
        return isUndefined(value) ? defalultValue : value;
      }
      /**
       * @description 渲染缓存
       * @param {number} width 
       * @param {number} height 
       */

    }, {
      key: "renderCache",
      value: function renderCache(width, height) {
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

    }, {
      key: "render",
      value: function render(ctx, x, y, width, height) {
        var rect = {
          x: x - this._nodeRadius,
          y: y - this._nodeRadius,
          width: width + this._nodeRadius * 2,
          height: height + this._nodeRadius * 2
        };
        this.renderCache(width, height);
        ctx.drawImage(this._cacheView, rect.x, rect.y, rect.width, rect.height);
      }
      /**
       * @description 渲染所有控制点
       * @param {number} width 
       * @param {number} height 
       */

    }, {
      key: "_renderNodes",
      value: function _renderNodes(width, height) {
        var _this = this;

        this._supportNodes.forEach(function (node) {
          var point = {
            x: 0,
            y: 0
          };
          var rect = {
            x: _this._nodeRadius,
            y: _this._nodeRadius,
            width: width - _this._nodeRadius * 2,
            height: height - _this._nodeRadius * 2
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
              point = {
                x: width / 2,
                y: _this._nodeRadius - _this._rotateNodeOffset
              };
              break;
          }

          _this._renderNode(point);
        });
      }
      /**
       * @description 渲染控制点
       * @param {object} point 
       * @param {number} point.x
       * @param {number} point.y
       */

    }, {
      key: "_renderNode",
      value: function _renderNode(point) {
        this._cacheCtx.save();

        this._cacheCtx.fillStyle = this._nodeColor;

        this._cacheCtx.beginPath();

        this._cacheCtx.arc(point.x, point.y, this._nodeRadius, 0, Math.PI * 2);

        this._cacheCtx.fill();

        this._cacheCtx.restore();
      }
    }], [{
      key: "TRACK_NODES",
      value: function TRACK_NODES() {
        return _TRACK_NODES;
      }
    }]);

    return Track;
  }();

  var Sprite = /*#__PURE__*/function () {
    function Sprite() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Sprite);

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

    _createClass(Sprite, [{
      key: "encode",
      value: function encode() {
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
          value: this.getValue()
        };
      }
    }, {
      key: "decode",
      value: function decode(data) {
        this._type = this.computedValue('_type', data.type, this.getType());
        this._x = this.computedValue('_x', data.x, this.getX());
        this._y = this.computedValue('_y', data.y, this.getY());
        this._width = this.computedValue('_width', data.width, this.getWidth());
        this._height = this.computedValue('_height', data.height, this.getHeight());
        this._angle = this.computedValue('_angle', data.angle, this.getAngle());
        this._originX = this.computedValue('_originX', data.originX, this.getOriginX());
        this._originY = this.computedValue('_originY', data.originY, this.getOriginY());
        this._flipX = this.computedValue('_flipX', data.flipX, this.getFlipY());
        this._flipY = this.computedValue('_flipY', data.flipY, this.getFlipY());
        this._opacity = this.computedValue('_opacity', data.opacity, this.getOpacity());
        this._value = this.computedValue('_value', data.value, this.getValue());
      }
    }, {
      key: "computedValue",
      value: function computedValue(key, value, defalultValue) {
        return util.isUndefined(value) ? defalultValue : value;
      }
      /**
       * @description 返回类型
       */

    }, {
      key: "type",
      get: function get() {
        return this._type;
      }
      /**
       * @description 返回类型
       * @returns
       */

    }, {
      key: "getValue",
      value: function getValue() {
        return this._value;
      }
      /**
       * @description 设置属性
       * @param {*} value
       * @returns
       */

    }, {
      key: "setValue",
      value: function setValue(value) {
        this._value = value;
        return this;
      }
      /**
       * @description 返回宽度
       * @returns {number}
       */

    }, {
      key: "getWidth",
      value: function getWidth() {
        return this._width;
      }
      /**
       * @description 设置宽度
       * @param {number} width
       * @returns
       */

    }, {
      key: "setWidth",
      value: function setWidth(width) {
        this._width = width;
        return this;
      }
      /**
       * @description 返回高度
       * @returns {number}
       */

    }, {
      key: "getHeight",
      value: function getHeight() {
        return this._height;
      }
      /**
       * @description 设置高度
       * @param {number} height
       * @returns
       */

    }, {
      key: "setHeight",
      value: function setHeight(height) {
        this._height = height;
        return this;
      }
      /**
       * @description 返回尺寸信息
       * @returns {object} size
       * @returns {number} size.width
       * @returns {number} size.height
       */

    }, {
      key: "getSize",
      value: function getSize() {
        return {
          width: this._width,
          height: this._height
        };
      }
      /**
       * @description 设置尺寸
       * @param {object} size
       * @param {number} size.width
       * @param {number} size.height
       * @returns
       */

    }, {
      key: "setSize",
      value: function setSize(size) {
        var isUndefined = util.isUndefined,
            isObject = util.isObject;
        if (!isObject(size)) throw new Error(constant.ARGUMENT_ERROR);
        if (!isUndefined(size.width)) this._width = size.width;
        if (!isUndefined(size.height)) this._height = size.height;
        return this;
      }
      /**
       * @description 返回x轴坐标
       * @returns {number}
       */

    }, {
      key: "getX",
      value: function getX() {
        return this._x;
      }
      /**
       * @description 设置x轴坐标
       * @param {number} x
       * @returns
       */

    }, {
      key: "setX",
      value: function setX(x) {
        this._x = x;
        return this;
      }
      /**
       * @description 返回y轴坐标
       * @returns {number} y
       */

    }, {
      key: "getY",
      value: function getY() {
        return this._y;
      }
      /**
       * @description 设置y轴坐标
       * @param {number} y
       * @returns
       */

    }, {
      key: "setY",
      value: function setY(y) {
        this._y = y;
        return this;
      }
      /**
       * @description 返回坐标
       * @returns {object} position
       * @returns {number} position.x
       * @returns {number} position.y
       */

    }, {
      key: "getPos",
      value: function getPos() {
        return {
          x: this._x,
          y: this._y
        };
      }
      /**
       * @description 设置坐标
       * @param {object} position
       * @param {number} position.x
       * @param {number} position.y
       * @returns
       */

    }, {
      key: "setPos",
      value: function setPos(position) {
        var isObject = util.isObject,
            isUndefined = util.isUndefined;
        if (!isObject(position)) throw new Error(constant.ARGUMENT_ERROR);
        if (!isUndefined(position.x)) this._x = position.x;
        if (!isUndefined(position.y)) this._y = position.y;
        return this;
      }
      /**
       * @description 返回透明度
       * @returns {number}
       */

    }, {
      key: "getOpacity",
      value: function getOpacity() {
        return this._opacity;
      }
      /**
       * @description 设置透明度
       * @param {number} opacity
       */

    }, {
      key: "setOpacity",
      value: function setOpacity(opacity) {
        this._opacity = opacity;
        return this;
      }
      /**
       * @description 返回锚点x轴坐标
       * @returns {number}
       */

    }, {
      key: "getOriginX",
      value: function getOriginX() {
        return this._originX;
      }
      /**
       * @description 设置锚点x轴坐标
       * @param {number} originX
       * @returns
       */

    }, {
      key: "setOriginX",
      value: function setOriginX(originX) {
        this._originX = originX;
        return this;
      }
      /**
       * @description 返回锚点y轴坐标
       * @returns
       */

    }, {
      key: "getOriginY",
      value: function getOriginY() {
        return this._originY;
      }
      /**
       * @description 设置锚点y轴坐标
       * @param {*} originY
       * @returns
       */

    }, {
      key: "setOriginY",
      value: function setOriginY(originY) {
        this._originY = originY;
        return this;
      }
      /**
       * @description 返回锚点坐标
       * @returns {object} origin
       * @returns {number} origin.x
       * @returns {number} origin.y
       */

    }, {
      key: "getOrigin",
      value: function getOrigin() {
        return {
          x: this._originX,
          y: this._originY
        };
      }
      /**
       * @description 设置锚点坐标
       * @param {object} origin
       * @param {number} origin.x
       * @param {number} origin.y
       * @returns
       */

    }, {
      key: "setOrigin",
      value: function setOrigin(origin) {
        var isObject = util.isObject,
            isUndefined = util.isUndefined;
        if (!isObject(origin)) throw new Error(constant.ARGUMENT_ERROR);
        if (!isUndefined(origin.x)) this._originX = origin.x;
        if (!isUndefined(origin.y)) this._originY = origin.y;
        return this;
      }
      /**
       * @description 返回旋转角度
       * @returns {number}
       */

    }, {
      key: "getAngle",
      value: function getAngle() {
        return this._angle;
      }
      /**
       * @description 设置旋转角度
       * @param {number} angle
       * @returns
       */

    }, {
      key: "setAngle",
      value: function setAngle(angle) {
        this._angle = angle;
        return this;
      }
      /**
       * @description 返回水平翻转
       * @returns
       */

    }, {
      key: "getFlipX",
      value: function getFlipX() {
        return this._flipX;
      }
      /**
       * @description 设置水平翻转
       * @param {number} x
       * @returns
       */

    }, {
      key: "setFlipX",
      value: function setFlipX(x) {
        this._flipX = x;
        return this;
      }
      /**
       * @description 返回垂直翻转
       * @returns
       */

    }, {
      key: "getFlipY",
      value: function getFlipY() {
        return this._flipY;
      }
      /**
       * @description 设置垂直翻转
       * @param {number} y
       * @returns
       */

    }, {
      key: "setFlipY",
      value: function setFlipY(y) {
        this._flipY = y;
        return this;
      }
      /**
       * @description 返回是否选中
       * @returns {boolean}
       */

    }, {
      key: "isSelected",
      value: function isSelected() {
        return this._selected;
      }
      /**
       * @description 选中元素
       * @returns
       */

    }, {
      key: "select",
      value: function select() {
        this._selected = true;
        return this;
      }
      /**
       * @description 取消元素选中
       * @returns
       */

    }, {
      key: "deselect",
      value: function deselect() {
        this._selected = false;
        return this;
      }
      /**
       * @description 渲染缓存
       */

    }, {
      key: "renderCache",
      value: function renderCache() {}
      /**
       * @description 渲染元素
       */

    }, {
      key: "render",
      value: function render() {}
      /**
       * @description 渲染控制器
       * @param {*} ctx
       */

    }, {
      key: "renderTrack",
      value: function renderTrack(ctx) {
        this._track = this._track || new Track({
          supportNodes: this._supportNodes
        });

        this._track.render(ctx, this._x, this._y, this._width, this._height);
      }
    }]);

    return Sprite;
  }();

  util.mixin(Sprite.prototype, observableMixin);

  var Text = /*#__PURE__*/function (_Sprite) {
    _inherits(Text, _Sprite);

    var _super = _createSuper(Text);

    function Text() {
      var _this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Text);

      _this = _super.call(this, props);
      _this._type = constant.SPRITE_TYPE_TEXT;
      _this._fontSize = _this.computedValue('_fontSize', props.fontSize, 36);
      _this._fontStyle = _this.computedValue('_fontStyle', props.fontStyle, 'normal');
      _this._fontWeight = _this.computedValue('_fontWeight', props.fontWeight, 'normal');
      _this._fontFamily = _this.computedValue('_fontFamily', props.fontFamily, 'sans-serif');
      _this._textAlign = _this.computedValue('_textAlign', props.textAlign, 'center');
      _this._lineHeight = _this.computedValue('_lineHeight', props.lineHeight, 1.2);
      _this._fillColor = _this.computedValue('_fillColor', props.fillColor, '#FFFFFF');
      _this._strokeColor = _this.computedValue('_strokeColor', props.strokeColor, '#FFFFFF');
      _this._value = _this.computedValue('_value', props.value, ['Enter Your Text']);
      _this._supportNodes = [0, 2, 4, 6];
      _this._fontBoundingBoxAscent = 0;

      _this.initSize();

      _this.renderCache();

      return _this;
    }

    _createClass(Text, [{
      key: "encode",
      value: function encode() {
        return _objectSpread2(_objectSpread2({}, _get(_getPrototypeOf(Text.prototype), "encode", this).call(this)), {}, {
          fontSize: this.getFontSize(),
          fontStyle: this.getFontStyle(),
          fontWeight: this.getFontWeight(),
          fontFamily: this.getFontFamily(),
          textAlign: this.getTextAlign(),
          lienHeight: this.getLineHeight()
        });
      }
    }, {
      key: "decode",
      value: function decode(data) {
        _get(_getPrototypeOf(Text.prototype), "decode", this).call(this, data);

        this._fontSize = this.computedValue('_fontSize', data.fontSize, this.getFontSize());
        this._fontStyle = this.computedValue('_fontStyle', data.fontStyle, this.getFontStyle());
        this._fontWeight = this.computedValue('_fontWeight', data.fontWeight, this.getFontWeight());
        this._textAlign = this.computedValue('_textAlgin', data.textAlign, this.getTextAlign());
        this._lineHeight = this.computedValue('_lineHeight', data.lineHeight, this.getLineHeight());
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

    }, {
      key: "_calcSize",
      value: function _calcSize() {
        var _this2 = this;

        return this._value.reduce(function (finalValue, text) {
          var opstions = {
            fontSize: _this2._fontSize,
            fontFamily: _this2._fontFamily,
            fontStyle: _this2._fontStyle,
            fontWeight: _this2._fontWeight
          };

          var _util$calcTextSize = util.calcTextSize(_this2._cacheCtx, text, opstions),
              width = _util$calcTextSize.width,
              height = _util$calcTextSize.height,
              fontBoundingBoxAscent = _util$calcTextSize.fontBoundingBoxAscent;

          return {
            width: Math.max(width, finalValue.width),
            height: height + finalValue.height,
            fontBoundingBoxAscent: fontBoundingBoxAscent
          };
        }, {
          width: 0,
          height: 0,
          fontBoundingBoxAscent: 0
        });
      }
      /**
       * @description 返回字号
       * @returns
       */

    }, {
      key: "getFontSize",
      value: function getFontSize() {
        return this._fontSize;
      }
      /**
       * @description 设置字号
       * @param {number} fontSize
       * @returns
       */

    }, {
      key: "setFontSize",
      value: function setFontSize(fontSize) {
        this._fontSize = fontSize;
        return this;
      }
      /**
       * @description 返回字体样式
       * @returns
       */

    }, {
      key: "getFontStyle",
      value: function getFontStyle() {
        return this._fontStyle;
      }
      /**
       * @description 设置字体样式
       * @param {string} fontStyle
       * @returns
       */

    }, {
      key: "setFontStyle",
      value: function setFontStyle(fontStyle) {
        this._fontStyle = fontStyle;
        return this;
      }
      /**
       * @description 返回字体粗细
       * @returns {string|number}
       */

    }, {
      key: "getFontWeight",
      value: function getFontWeight() {
        return this._fontWeight;
      }
      /**
       * @description 设置字体粗细
       * @param {string|number} fontWeight
       * @returns
       */

    }, {
      key: "setFontWeight",
      value: function setFontWeight(fontWeight) {
        this._fontWeight = fontWeight;
        return this;
      }
      /**
       * @description 返回字体
       * @returns {string}
       */

    }, {
      key: "getFontFamily",
      value: function getFontFamily() {
        return this._fontFamily;
      }
      /**
       * @description 设置字体
       * @param {string} fontFamily
       * @returns
       */

    }, {
      key: "setFontFamily",
      value: function setFontFamily(fontFamily) {
        this._fontFamily = fontFamily;
        return this;
      }
      /**
       * @description 返回文字对齐
       * @returns {string}
       */

    }, {
      key: "getTextAlign",
      value: function getTextAlign() {
        return this._textAlign;
      }
      /**
       * @description 设置文字对齐
       * @param {string} textAlign
       * @returns
       */

    }, {
      key: "setTextAlign",
      value: function setTextAlign(textAlign) {
        this._textAlign = textAlign;
        return this;
      }
      /**
       * @description 返回文字行高
       * @returns {number}
       */

    }, {
      key: "getLineHeight",
      value: function getLineHeight() {
        return this._lineHeight;
      }
      /**
       * @description 设置文字行高
       * @param {number} lineHeight
       * @returns
       */

    }, {
      key: "setLineHeight",
      value: function setLineHeight(lineHeight) {
        this._lineHeight = lineHeight;
        return this;
      }
      /**
       * @description 返回填充颜色
       * @returns {string}
       */

    }, {
      key: "getFillColor",
      value: function getFillColor() {
        return this._fillColor;
      }
      /**
       * @description 设置填充颜色
       * @param {*} color
       * @returns
       */

    }, {
      key: "setFillColor",
      value: function setFillColor(color) {
        this._fillColor = color;
        return this;
      }
      /**
       * @description 返回边框颜色
       * @returns
       */

    }, {
      key: "getStrokeColor",
      value: function getStrokeColor() {
        return this._strokeColor;
      }
      /**
       * @description 设置边框颜色
       * @param {string} color
       * @returns
       */

    }, {
      key: "setStrokeColor",
      value: function setStrokeColor(color) {
        this._strokeColor = color;
        return this;
      }
      /**
       * @description 初始化尺寸
       */

    }, {
      key: "initSize",
      value: function initSize() {
        var _this$_calcSize = this._calcSize(),
            width = _this$_calcSize.width,
            height = _this$_calcSize.height,
            fontBoundingBoxAscent = _this$_calcSize.fontBoundingBoxAscent;

        this.setSize({
          width: width,
          height: height
        });
        this._fontBoundingBoxAscent = fontBoundingBoxAscent;
      }
    }, {
      key: "renderCache",
      value: function renderCache() {
        var _this3 = this;

        var perPixel = config.perPixel;
        var x = 0;
        var y = 0;
        var width = this._width * perPixel;
        var height = this._height * perPixel;
        var fontSize = this._fontSize * perPixel;

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
        this._cacheCtx.font = "".concat(this._fontStyle, " ").concat(this._fontWeight, " ").concat(fontSize, "px ").concat(this._fontFamily);
        this._cacheCtx.fillStyle = this._fillColor;
        this._cacheCtx.strokeStyle = this._strokeColor; // this._cacheCtx.textBaseline = 'top';

        this._cacheCtx.textAlign = this._textAlign;

        this._value.forEach(function (text, index) {
          y = index * _this3._lineHeight * fontSize + _this3._fontBoundingBoxAscent;

          _this3._cacheCtx.fillText(text, x, y);
        });
      }
    }, {
      key: "render",
      value: function render(ctx) {
        ctx.drawImage(this._cacheView, this._x, this._y, this._width, this._height);
      }
    }]);

    return Text;
  }(Sprite);

  var index = {
    Canvas: Canvas,
    Text: Text
  };

  return index;

})));
