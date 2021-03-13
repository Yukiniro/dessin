/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
window.CanvasCore =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Canvas\": () => /* reexport safe */ _src_Canvas__WEBPACK_IMPORTED_MODULE_0__.default,\n/* harmony export */   \"Text\": () => /* reexport safe */ _src_sprite_Text__WEBPACK_IMPORTED_MODULE_1__.default\n/* harmony export */ });\n/* harmony import */ var _src_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Canvas */ \"./src/Canvas.js\");\n/* harmony import */ var _src_sprite_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/sprite/Text */ \"./src/sprite/Text.js\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://CanvasCore/./index.js?");

/***/ }),

/***/ "./src/Canvas.js":
/*!***********************!*\
  !*** ./src/Canvas.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/util */ \"./src/util/util.js\");\n/* harmony import */ var _mixin_collection_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin/collection.mixin */ \"./src/mixin/collection.mixin.js\");\n/* harmony import */ var _mixin_observable_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixin/observable.mixin */ \"./src/mixin/observable.mixin.js\");\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event */ \"./src/event.js\");\n\r\n\r\n\r\n\r\n\r\nclass Canvas {\r\n\r\n  constructor(props = {}) {\r\n    this._lowerCanvas = props && props.canvas; // 渲染视图\r\n    this._upperCanvas = document.createElement('canvas'); // 事件响应、辅助线视图\r\n    this._size = {width: 500, height: 500};\r\n    this._viewResponse = 1; // 实际渲染与最终成像之间的比例关系\r\n\r\n    this._initView();\r\n    this._updateView();\r\n  }\r\n\r\n  _initView() {\r\n    let parent = this._lowerCanvas.parentNode;\r\n    let parentPositionStyle = parent.style.position;\r\n    parent.insertBefore(this._upperCanvas, this._lowerCanvas.nextSibling);\r\n    if (!parentPositionStyle || parentPositionStyle === 'static') {\r\n      _util_util__WEBPACK_IMPORTED_MODULE_0__.default.css(parent, {position: 'relative'});\r\n    }\r\n    _util_util__WEBPACK_IMPORTED_MODULE_0__.default.css(this._lowerCanvas, {\r\n      position: 'absolute',\r\n    });\r\n    _util_util__WEBPACK_IMPORTED_MODULE_0__.default.css(this._upperCanvas, {\r\n      position: 'absolute',\r\n    });\r\n    _event__WEBPACK_IMPORTED_MODULE_3__.default.bindView(this, this._upperCanvas);\r\n  }\r\n\r\n  _updateView() {\r\n    let {width, height} = this._size;\r\n    this._lowerCanvas.width = width;\r\n    this._lowerCanvas.height = height;\r\n    this._upperCanvas.width = width;\r\n    this._upperCanvas.height = height;\r\n\r\n    this.render();\r\n  }\r\n\r\n  render() {\r\n\r\n  }\r\n\r\n  getSize() {\r\n    return this._size;\r\n  }\r\n\r\n  setSize(size) {\r\n    this._size = {...size};\r\n    this._updateView();\r\n    return this;\r\n  }\r\n\r\n  fireEvent(type, e) {\r\n    \r\n  }\r\n}\r\n\r\n_util_util__WEBPACK_IMPORTED_MODULE_0__.default.mixin(Canvas.prototype, _mixin_collection_mixin__WEBPACK_IMPORTED_MODULE_1__.default);\r\n_util_util__WEBPACK_IMPORTED_MODULE_0__.default.mixin(Canvas.prototype, _mixin_observable_mixin__WEBPACK_IMPORTED_MODULE_2__.default);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);\n\n//# sourceURL=webpack://CanvasCore/./src/Canvas.js?");

/***/ }),

/***/ "./src/constant/constant.js":
/*!**********************************!*\
  !*** ./src/constant/constant.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n  ARGUMENT_ERROR: 'ARGUMENT_ERROR',\r\n\r\n  MOUSE_DOWN: 'MOUSE_DOWN',\r\n  MOUSE_UP: 'MOUSE_UP',\r\n  MOUSE_MOVE: 'MOUSE_MOVE',\r\n  MOUSE_DRAG: 'MOUSE_DRAG',\r\n  MOUSE_DROP: 'MOUSE_DROP',\r\n  MOUSE_HOVER: 'MOUSE_HOVER',\r\n\r\n  SPRITE_TYPE_TEXT: 'TEXT',\r\n  SPRITE_TYPE_PATH: 'PATH',\r\n  SPRITE_TYPE_IMAGE: 'IMAGE',\r\n  SPRITE_TYPE_RECT: 'RECT',\r\n  SPRITE_TYPE_POLYGON: 'POLYGON',\r\n  SPRITE_TYPE_CIRCLE: 'CIRCLE',\r\n  SPRITE_TYPE_ELLIPSE: 'ELLIPSE',\r\n  SPRITE_TYPE_LINE: 'LINE',\r\n});\n\n//# sourceURL=webpack://CanvasCore/./src/constant/constant.js?");

/***/ }),

/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _constant_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant/constant */ \"./src/constant/constant.js\");\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/util */ \"./src/util/util.js\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function() {\r\n\r\n  let _view = null;\r\n  let _owner = null;\r\n  let _isMouseDown = false;\r\n  let _isMouseDrag = false;\r\n\r\n  function onMouseDown(e) {\r\n    _isMouseDown = true;\r\n    _owner.fireEvent(_constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.MOUSE_DOWN, e);\r\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.addEventListener(document.body, 'mouseup', onMouseUp);\r\n  }\r\n\r\n  function onMouseMove(e) {\r\n    let {MOUSE_HOVER, MOUSE_DRAG, MOUSE_MOVE} = _constant_constant__WEBPACK_IMPORTED_MODULE_0__.default;\r\n    _owner.fireEvent(MOUSE_MOVE, e);\r\n    if (_isMouseDown) {\r\n      _owner.fireEvent(MOUSE_DRAG, e);\r\n      _isMouseDrag = true;\r\n    } else {\r\n      _owner.fireEvent(MOUSE_HOVER, e);\r\n    }\r\n  }\r\n\r\n  function onMouseUp(e) {\r\n    let {MOUSE_UP, MOUSE_DROP} = _constant_constant__WEBPACK_IMPORTED_MODULE_0__.default;\r\n    _owner.fireEvent(MOUSE_UP, e);\r\n    if (_isMouseDrag) {\r\n      _owner.fireEvent(MOUSE_DROP, e);\r\n      _isMouseDrag = false;\r\n    }\r\n    _isMouseDown = false;\r\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.removeEventListener(document.body, 'mouseup', onMouseUp);\r\n  }\r\n\r\n  function bindEvent() {\r\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.addEventListener(_view, 'mousedown', onMouseDown);\r\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.addEventListener(_view, 'mousemove', onMouseMove);\r\n  }\r\n\r\n  function unbindEvent() {\r\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.removeEventListener(_view, 'mousedown', onMouseDown);\r\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.removeEventListener(_view, 'mousemove', onMouseMove);\r\n  }\r\n\r\n  return {\r\n\r\n    /**\r\n     * @description 绑定视图及事件\r\n     * @param {*} owner \r\n     * @param {*} view \r\n     */\r\n    bindView: function (owner, view) {\r\n      if (_view) {\r\n        unbindEvent();\r\n      }\r\n      _view = view;\r\n      _owner = owner;\r\n      bindEvent();\r\n    }\r\n  }\r\n})());\n\n//# sourceURL=webpack://CanvasCore/./src/event.js?");

/***/ }),

/***/ "./src/mixin/collection.mixin.js":
/*!***************************************!*\
  !*** ./src/mixin/collection.mixin.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function () {\r\n\r\n  let _items = [];\r\n  return {\r\n    \r\n    /**\r\n     * @descrition 添加某个元素\r\n     * @param {*} item \r\n     */\r\n    add: function (item) {\r\n      if (!_items.includes(item)) {\r\n        _items.push(item);\r\n      }\r\n    },\r\n\r\n    /**\r\n     * @description 移除某个元素\r\n     * @param {*} item \r\n     */\r\n    remove: function (item) {\r\n      _util_util__WEBPACK_IMPORTED_MODULE_0__.default.removeFromArray(_items, item);\r\n    },\r\n\r\n    /**\r\n     * @description 对每个元素调用handler\r\n     * @param {*} handler \r\n     */\r\n    forEachItem: function (handler) {\r\n      _items.forEach((item, index) => {\r\n        handler.call(this, item, index);\r\n      });\r\n    },\r\n\r\n    /**\r\n     * @description 返回当前元素个数\r\n     */\r\n    size: function () {\r\n      return _items.length;\r\n    },\r\n\r\n    /**\r\n     * @description 移除所有元素\r\n     */\r\n    removeAll: function () {\r\n      _items.length = 0;\r\n    },\r\n\r\n    /**\r\n     * @description 插入某个元素\r\n     * @param {*} item \r\n     * @param {number} index \r\n     */\r\n    inserAt: function (item, index) {\r\n      _items.splice(index, 0, item);\r\n    },\r\n\r\n    /**\r\n     * @description 集合是否包含某个元素\r\n     * @param {*} item \r\n     */\r\n    includes: function (item) {\r\n      return _items.includes(item);\r\n    },\r\n  };\r\n})());\n\n//# sourceURL=webpack://CanvasCore/./src/mixin/collection.mixin.js?");

/***/ }),

/***/ "./src/mixin/observable.mixin.js":
/*!***************************************!*\
  !*** ./src/mixin/observable.mixin.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function () {\r\n\r\n  let _listeners = {};\r\n  return {\r\n    on: function (eventName, handler) {\r\n      _listeners[eventName] = _listeners[eventName] || [];\r\n      _listeners[eventName].push(handler);\r\n    },\r\n    off: function (eventName, handler) {\r\n      if (!_listeners[eventName]) {\r\n        return;\r\n      }\r\n      \r\n      _util_util__WEBPACK_IMPORTED_MODULE_0__.default.removeFromArray(_listeners[eventName], handler);\r\n    },\r\n    fire: function () {\r\n      let _args = [...arguments];\r\n      let _eventName = _args[0];\r\n      _util_util__WEBPACK_IMPORTED_MODULE_0__.default.removeFromArray(_args, _eventName);\r\n      (_listeners[_eventName] || []).forEach(handler => {\r\n        handler.call(this, ..._args);\r\n      });\r\n    },\r\n  }\r\n})());\n\n//# sourceURL=webpack://CanvasCore/./src/mixin/observable.mixin.js?");

/***/ }),

/***/ "./src/sprite/Sprite.js":
/*!******************************!*\
  !*** ./src/sprite/Sprite.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _mixin_observable_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixin/observable.mixin */ \"./src/mixin/observable.mixin.js\");\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\r\n\r\n\r\nclass Sprite {\r\n\r\n  constructor(props = {}) {\r\n    let _props = {\r\n      type: '',\r\n      width: 1,\r\n      heihgt: 1,\r\n      angle: 0,\r\n      originX: 0,\r\n      originY: 0,\r\n      flipX: 1,\r\n      flipY: 1,\r\n      x: 0,\r\n      y: 0,\r\n      opacity: 1,\r\n      ...props,\r\n    }\r\n\r\n    for (let i in _props) {\r\n      if (Object.prototype.hasOwnProperty.call(_props, i)) {\r\n        this[`_${i}`] = _props[i];\r\n      }\r\n    }\r\n\r\n    this._selected = false;\r\n    this._cacheView = document.createElement('canvas');\r\n    this._cacheCtx = this._cacheView.getContext('2d');\r\n  }\r\n\r\n  get type() {\r\n    return this._type;\r\n  }\r\n\r\n  getWidth() {\r\n    return this._width;\r\n  }\r\n\r\n  setWidth(width) {\r\n    this._width = width;\r\n    return this;\r\n  }\r\n\r\n  getHeight() {\r\n    return this._height;\r\n  }\r\n\r\n  setHeight(height) {\r\n    this._height = height;\r\n    return this;\r\n  }\r\n\r\n  getSize() {\r\n    return {width: this._width, height: this._height};\r\n  }\r\n\r\n  setSize(size) {\r\n    this._width = size.width;\r\n    this._height = size.height;\r\n    return this;\r\n  }\r\n\r\n  getX() {\r\n    return this._x;\r\n  }\r\n\r\n  setX(x) {\r\n    this._x = x;\r\n    return this;\r\n  }\r\n\r\n  getY() {\r\n    return this._y;\r\n  }\r\n\r\n  setY(y) {\r\n    this._y = y;\r\n    return this;\r\n  }\r\n\r\n  getPos() {\r\n    return {x: this._x, y: this._y};\r\n  }\r\n\r\n  setPos(pos) {\r\n    this._x = pos.x;\r\n    this._y = pos.y;\r\n    return this;\r\n  }\r\n\r\n  getOpacity() {\r\n    return this._opacity;\r\n  }\r\n\r\n  setOpacity(opacity) {\r\n    this._opacity = opacity;\r\n  }\r\n\r\n  getOriginX() {\r\n    return this._originX;\r\n  }\r\n\r\n  setOriginX(x) {\r\n    this._originX = x;\r\n    return this;\r\n  }\r\n\r\n  getOriginY(y) {\r\n    return this._originY;\r\n  }\r\n\r\n  setOriginY() {\r\n    this._originY = y;\r\n    return this;\r\n  }\r\n\r\n  getOrigin() {\r\n    return {x: this._originX, y: this._originY};\r\n  }\r\n\r\n  setOrigin(origin) {\r\n    this._originX = origin.x;\r\n    this._originY = origin.y;\r\n    return this;\r\n  }\r\n\r\n  getAngle() {\r\n    return this._angle;\r\n  }\r\n\r\n  setAngle(angle) {\r\n    this._angle = angle;\r\n    return this;\r\n  }\r\n\r\n  getFlipX() {\r\n    return this._flipX;\r\n  }\r\n\r\n  setFlipX(x) {\r\n    this._flipX = x;\r\n    return this;\r\n  }\r\n\r\n  getFlipY() {\r\n    return this._flipY;\r\n  }\r\n\r\n  setFlipY(y) {\r\n    this._flipY = y;\r\n    return this;\r\n  }\r\n\r\n  isSelected() {\r\n    return this._selected;\r\n  }\r\n\r\n  select() {\r\n    this._selected = true;\r\n    return this;\r\n  }\r\n\r\n  deselect() {\r\n    this._selected = false;\r\n    return this;\r\n  }\r\n\r\n  renderCache() {}\r\n\r\n  render() {}\r\n}\r\n\r\n_util_util__WEBPACK_IMPORTED_MODULE_1__.default.mixin(Sprite.prototype, _mixin_observable_mixin__WEBPACK_IMPORTED_MODULE_0__.default);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sprite);\n\n//# sourceURL=webpack://CanvasCore/./src/sprite/Sprite.js?");

/***/ }),

/***/ "./src/sprite/Text.js":
/*!****************************!*\
  !*** ./src/sprite/Text.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _constant_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant/constant */ \"./src/constant/constant.js\");\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sprite */ \"./src/sprite/Sprite.js\");\n\r\n\r\n\r\nclass Text extends _Sprite__WEBPACK_IMPORTED_MODULE_1__.default {\r\n\r\n  constructor(props = {}) {\r\n    let _props = {\r\n      type: _constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.SPRITE_TYPE_TEXT,\r\n      fontSize: 16,\r\n      fontStyle: 'normal',\r\n      fontWeight: 'normal',\r\n      fontFamily: 'Times New Roman',\r\n      textAlign: 'center',\r\n      lineHeight: 1.2,\r\n      text: '',\r\n      ...props,\r\n    }\r\n    super(_props);\r\n  }\r\n\r\n  getText() {\r\n    return this._text;\r\n  }\r\n\r\n  setText(text) {\r\n    this._text = text;\r\n    return this;\r\n  }\r\n\r\n  getFontSize() {\r\n    return this._fontSize;\r\n  }\r\n\r\n  setFontSize(fontSize) {\r\n    this._fontSize = fontSize;\r\n    return this;\r\n  }\r\n\r\n  getFontStyle() {\r\n    return this._fontStyle;\r\n  }\r\n\r\n  setFontStyle(fontStyle) {\r\n    this._fontStyle = fontStyle;\r\n    return this;\r\n  }\r\n\r\n  getFontFamily() {\r\n    return this._fontFamily;\r\n  }\r\n\r\n  setFontFamily(fontFamily) {\r\n    this._fontFamily = fontFamily;\r\n    return this;\r\n  }\r\n\r\n  getTextAlign() {\r\n    return this._textAlign;\r\n  }\r\n\r\n  setTextAlign(textAlign) {\r\n    this._textAlign = textAlign;\r\n    return this;\r\n  }\r\n\r\n  getLineHeight() {\r\n    return this._lineHeight;\r\n  }\r\n\r\n  setLineHeight(lineHeight) {\r\n    this._lineHeight = lineHeight;\r\n    return this;\r\n  }\r\n\r\n  renderCache() {\r\n    \r\n  }\r\n\r\n  render() {\r\n\r\n  }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Text);\n\n//# sourceURL=webpack://CanvasCore/./src/sprite/Text.js?");

/***/ }),

/***/ "./src/util/util.js":
/*!**************************!*\
  !*** ./src/util/util.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _constant_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant/constant */ \"./src/constant/constant.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function () {\r\n\r\n  return {\r\n\r\n    /**\r\n     * @description 判断是否为定义\r\n     * @param {*} source \r\n     */\r\n    isUndefined: function (source) {\r\n      return typeof source === 'undefined';\r\n    },\r\n\r\n    /**\r\n     * @description 判断是否为对象\r\n     * @param {*} source \r\n     */\r\n    isObject: function (source) {\r\n      return typeof source === 'object' && source !== null;\r\n    },\r\n\r\n    /**\r\n     * @description 深拷贝\r\n     * @param {*} source \r\n     */\r\n    deepClone: function (source) {\r\n      if (this.isObject(source)) {\r\n        if (Array.isArray(source)) {\r\n          return source.map(item => this.deepClone(item));\r\n        } else {\r\n          let result = {};\r\n          for (let key in source) {\r\n            if (Object.prototype.hasOwnProperty.call(source, key)) {\r\n              result[key] = this.deepClone(source[key]);\r\n            }\r\n          }\r\n          return result;\r\n        }\r\n      } else {\r\n        return source;\r\n      }\r\n    },\r\n\r\n    /**\r\n     * @description 混入\r\n     * @param {*} target \r\n     * @param {*} source \r\n     */\r\n    mixin: function (target, source) {\r\n      return Object.assign(target, this.deepClone(source));\r\n    },\r\n\r\n    /**\r\n     * @description 移除指定数组中的指定项\r\n     * @param array\r\n     * @param item\r\n     */\r\n    removeFromArray: function (array, item) {\r\n      if (!Array.isArray(array)) {\r\n        throw _constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.ARGUMENT_ERROR;\r\n      }\r\n      let index = array.indexof(item);\r\n      if (index !== -1) {\r\n        array.splice(index, 1);\r\n      }\r\n    },\r\n\r\n    /**\r\n     * @description 绑定DOM事件\r\n     * @param {*} target \r\n     * @param {*} eventName \r\n     * @param {*} handler \r\n     */\r\n    addEventListener: function (target, eventName, handler) {\r\n      if (!target) {\r\n        throw new Error(_constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.ARGUMENT_ERROR);\r\n      }\r\n\r\n      if (target.addEventListener) {\r\n        target.addEventListener(eventName, handler);\r\n      } else if (target.attachEvent) {\r\n        target.attachEvent(`on${eventName}`, handler);\r\n      }\r\n    },\r\n\r\n    /**\r\n     * @description 解绑DOM事件\r\n     * @param {*} target \r\n     * @param {*} eventName \r\n     * @param {*} handler \r\n     */\r\n    removeEventListener: function (target, eventName, handler) {\r\n      if (!target) {\r\n        throw new Error(_constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.ARGUMENT_ERROR);\r\n      }\r\n\r\n      if (target.removeEventListener) {\r\n        target.removeEventListener(eventName, handler);\r\n      } else if (target.detachEvent) {\r\n        target.detachEvent(eventName, handler);\r\n      }\r\n    },\r\n\r\n    /**\r\n     * @description 设置元素的css\r\n     * @param {*} element \r\n     * @param {*} style \r\n     */\r\n    css(element, style) {\r\n      for (let key in style) {\r\n        if (Object.hasOwnProperty.call(style, key)) {\r\n          element.style[key] = style[key];\r\n        }\r\n      }\r\n    }\r\n  }\r\n})());\n\n//# sourceURL=webpack://CanvasCore/./src/util/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./index.js");
/******/ })()
;