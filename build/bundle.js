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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Canvas\": () => /* reexport safe */ _src_Canvas__WEBPACK_IMPORTED_MODULE_0__.default,\n/* harmony export */   \"Text\": () => /* reexport safe */ _src_sprite_Text__WEBPACK_IMPORTED_MODULE_1__.default\n/* harmony export */ });\n/* harmony import */ var _src_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Canvas */ \"./src/Canvas.js\");\n/* harmony import */ var _src_sprite_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/sprite/Text */ \"./src/sprite/Text.js\");\n\n\n\n\n\n//# sourceURL=webpack://CanvasCore/./index.js?");

/***/ }),

/***/ "./src/Canvas.js":
/*!***********************!*\
  !*** ./src/Canvas.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/util */ \"./src/util/util.js\");\n/* harmony import */ var _mixin_collection_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin/collection.mixin */ \"./src/mixin/collection.mixin.js\");\n/* harmony import */ var _mixin_observable_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixin/observable.mixin */ \"./src/mixin/observable.mixin.js\");\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event */ \"./src/event.js\");\n\n\n\n\n\nclass Canvas {\n\n  constructor(props = {}) {\n    this._lowerCanvas = props && props.canvas; // 渲染视图\n    this._upperCanvas = document.createElement('canvas'); // 事件响应、辅助线视图\n    this._size = {width: 500, height: 500};\n    this._viewResponse = 1; // 实际渲染与最终成像之间的比例关系\n\n    this._initView();\n    this._updateView();\n  }\n\n  _initView() {\n    let parent = this._lowerCanvas.parentNode;\n    let parentPositionStyle = parent.style.position;\n    parent.insertBefore(this._upperCanvas, this._lowerCanvas.nextSibling);\n    if (!parentPositionStyle || parentPositionStyle === 'static') {\n      _util_util__WEBPACK_IMPORTED_MODULE_0__.default.css(parent, {position: 'relative'});\n    }\n    _util_util__WEBPACK_IMPORTED_MODULE_0__.default.css(this._lowerCanvas, {\n      position: 'absolute',\n    });\n    _util_util__WEBPACK_IMPORTED_MODULE_0__.default.css(this._upperCanvas, {\n      position: 'absolute',\n    });\n    _event__WEBPACK_IMPORTED_MODULE_3__.default.bindView(this, this._upperCanvas);\n  }\n\n  _updateView() {\n    let {width, height} = this._size;\n    this._lowerCanvas.width = width;\n    this._lowerCanvas.height = height;\n    this._upperCanvas.width = width;\n    this._upperCanvas.height = height;\n\n    this.render();\n  }\n\n  _clear() {\n    let {width, height} = this.getSize();\n    this._lowerCanvas.getContext('2d').clearRect(0, 0, width, height);\n  }\n\n  render() {\n    this.forEachItem((sprite) => {\n      sprite.render(this._lowerCanvas.getContext('2d'));\n    });\n  }\n\n  getSize() {\n    return this._size;\n  }\n\n  setSize(size) {\n    this._size = {...size};\n    this._updateView();\n    return this;\n  }\n\n  fireEvent(type, e) {\n    \n  }\n}\n\n_util_util__WEBPACK_IMPORTED_MODULE_0__.default.mixin(Canvas.prototype, _mixin_collection_mixin__WEBPACK_IMPORTED_MODULE_1__.default);\n_util_util__WEBPACK_IMPORTED_MODULE_0__.default.mixin(Canvas.prototype, _mixin_observable_mixin__WEBPACK_IMPORTED_MODULE_2__.default);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);\n\n//# sourceURL=webpack://CanvasCore/./src/Canvas.js?");

/***/ }),

/***/ "./src/constant/constant.js":
/*!**********************************!*\
  !*** ./src/constant/constant.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  ARGUMENT_ERROR: 'ARGUMENT_ERROR',\n\n  MOUSE_DOWN: 'MOUSE_DOWN',\n  MOUSE_UP: 'MOUSE_UP',\n  MOUSE_MOVE: 'MOUSE_MOVE',\n  MOUSE_DRAG: 'MOUSE_DRAG',\n  MOUSE_DROP: 'MOUSE_DROP',\n  MOUSE_HOVER: 'MOUSE_HOVER',\n\n  SPRITE_TYPE_TEXT: 'TEXT',\n  SPRITE_TYPE_PATH: 'PATH',\n  SPRITE_TYPE_IMAGE: 'IMAGE',\n  SPRITE_TYPE_RECT: 'RECT',\n  SPRITE_TYPE_POLYGON: 'POLYGON',\n  SPRITE_TYPE_CIRCLE: 'CIRCLE',\n  SPRITE_TYPE_ELLIPSE: 'ELLIPSE',\n  SPRITE_TYPE_LINE: 'LINE',\n});\n\n//# sourceURL=webpack://CanvasCore/./src/constant/constant.js?");

/***/ }),

/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _constant_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant/constant */ \"./src/constant/constant.js\");\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/util */ \"./src/util/util.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function() {\n\n  let _view = null;\n  let _owner = null;\n  let _isMouseDown = false;\n  let _isMouseDrag = false;\n\n  function onMouseDown(e) {\n    _isMouseDown = true;\n    _owner.fireEvent(_constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.MOUSE_DOWN, e);\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.addEventListener(document.body, 'mouseup', onMouseUp);\n  }\n\n  function onMouseMove(e) {\n    let {MOUSE_HOVER, MOUSE_DRAG, MOUSE_MOVE} = _constant_constant__WEBPACK_IMPORTED_MODULE_0__.default;\n    _owner.fireEvent(MOUSE_MOVE, e);\n    if (_isMouseDown) {\n      _owner.fireEvent(MOUSE_DRAG, e);\n      _isMouseDrag = true;\n    } else {\n      _owner.fireEvent(MOUSE_HOVER, e);\n    }\n  }\n\n  function onMouseUp(e) {\n    let {MOUSE_UP, MOUSE_DROP} = _constant_constant__WEBPACK_IMPORTED_MODULE_0__.default;\n    _owner.fireEvent(MOUSE_UP, e);\n    if (_isMouseDrag) {\n      _owner.fireEvent(MOUSE_DROP, e);\n      _isMouseDrag = false;\n    }\n    _isMouseDown = false;\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.removeEventListener(document.body, 'mouseup', onMouseUp);\n  }\n\n  function bindEvent() {\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.addEventListener(_view, 'mousedown', onMouseDown);\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.addEventListener(_view, 'mousemove', onMouseMove);\n  }\n\n  function unbindEvent() {\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.removeEventListener(_view, 'mousedown', onMouseDown);\n    _util_util__WEBPACK_IMPORTED_MODULE_1__.default.removeEventListener(_view, 'mousemove', onMouseMove);\n  }\n\n  return {\n\n    /**\n     * @description 绑定视图及事件\n     * @param {*} owner \n     * @param {*} view \n     */\n    bindView: function (owner, view) {\n      if (_view) {\n        unbindEvent();\n      }\n      _view = view;\n      _owner = owner;\n      bindEvent();\n    }\n  }\n})());\n\n//# sourceURL=webpack://CanvasCore/./src/event.js?");

/***/ }),

/***/ "./src/mixin/collection.mixin.js":
/*!***************************************!*\
  !*** ./src/mixin/collection.mixin.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function () {\n\n  let _items = [];\n  return {\n    \n    /**\n     * @descrition 添加某个元素\n     * @param {*} item \n     */\n    add: function (item) {\n      if (!_items.includes(item)) {\n        _items.push(item);\n      }\n    },\n\n    /**\n     * @description 移除某个元素\n     * @param {*} item \n     */\n    remove: function (item) {\n      _util_util__WEBPACK_IMPORTED_MODULE_0__.default.removeFromArray(_items, item);\n    },\n\n    /**\n     * @description 对每个元素调用handler\n     * @param {*} handler \n     */\n    forEachItem: function (handler) {\n      _items.forEach((item, index) => {\n        handler.call(this, item, index);\n      });\n    },\n\n    /**\n     * @description 返回当前元素个数\n     */\n    size: function () {\n      return _items.length;\n    },\n\n    /**\n     * @description 移除所有元素\n     */\n    removeAll: function () {\n      _items.length = 0;\n    },\n\n    /**\n     * @description 插入某个元素\n     * @param {*} item \n     * @param {number} index \n     */\n    inserAt: function (item, index) {\n      _items.splice(index, 0, item);\n    },\n\n    /**\n     * @description 集合是否包含某个元素\n     * @param {*} item \n     */\n    includes: function (item) {\n      return _items.includes(item);\n    },\n  };\n})());\n\n//# sourceURL=webpack://CanvasCore/./src/mixin/collection.mixin.js?");

/***/ }),

/***/ "./src/mixin/observable.mixin.js":
/*!***************************************!*\
  !*** ./src/mixin/observable.mixin.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function () {\n\n  let _listeners = {};\n  return {\n    on: function (eventName, handler) {\n      _listeners[eventName] = _listeners[eventName] || [];\n      _listeners[eventName].push(handler);\n    },\n    off: function (eventName, handler) {\n      if (!_listeners[eventName]) {\n        return;\n      }\n      \n      _util_util__WEBPACK_IMPORTED_MODULE_0__.default.removeFromArray(_listeners[eventName], handler);\n    },\n    fire: function () {\n      let _args = [...arguments];\n      let _eventName = _args[0];\n      _util_util__WEBPACK_IMPORTED_MODULE_0__.default.removeFromArray(_args, _eventName);\n      (_listeners[_eventName] || []).forEach(handler => {\n        handler.call(this, ..._args);\n      });\n    },\n  }\n})());\n\n//# sourceURL=webpack://CanvasCore/./src/mixin/observable.mixin.js?");

/***/ }),

/***/ "./src/sprite/Sprite.js":
/*!******************************!*\
  !*** ./src/sprite/Sprite.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _mixin_observable_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixin/observable.mixin */ \"./src/mixin/observable.mixin.js\");\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\n\n\nclass Sprite {\n\n  constructor(props = {}) {\n    this._type = this.computedValue('_type', props.type, '');\n    this._x = this.computedValue('_x', props.x, 0);\n    this._y = this.computedValue('_y', props.y, 0);\n    this._width = this.computedValue('_width', props.width, 0);\n    this._height = this.computedValue('_height', props.height, 0);\n    this._angle = this.computedValue('_angle', props.angle, 0);\n    this._originX = this.computedValue('_originX', props.originX, 0);\n    this._originY = this.computedValue('_originY', props.originY, 0);\n    this._flipX = this.computedValue('_flipX', props.flipX, 1);\n    this._flipY = this.computedValue('_flipY', props.flipY, 0);\n    this._opacity = this.computedValue('_opacity', props.opacity, 1);\n    this._value = this.computedValue('_value', props.value, '');\n    this._selected = false;\n    this._cacheView = document.createElement('canvas');\n    this._cacheCtx = this._cacheView.getContext('2d');\n  }\n\n  encode() {\n    return {\n      type: this.type,\n      x: this.getX(),\n      y: this.getY(),\n      width: this.getWidth(),\n      hieght:this.getHeight(),\n      angle: this.getAngle(),\n      originX: this.getOriginX(),\n      originY: this.getOriginY(),\n      flipX: this.getFlipX(),\n      flipY: this.getFlipY(),\n      opacity: this.getOpacity(),\n      value: this.getValue(),\n    }\n  }\n\n  decode(data) {\n    this._type = this.computedValue('_type', data.type, this.getType());\n    this._x = this.computedValue('_x', data.x, this.getX());\n    this._y = this.computedValue('_y', data.y, this.getY());\n    this._width = this.computedValue('_width', data.width, this.getWidth());\n    this._height = this.computedValue('_height', data.height, this.getHeight());\n    this._angle = this.computedValue('_angle', data.angle, this.getAngle());\n    this._originX = this.computedValue('_originX', data.originX, this.getOriginX());\n    this._originY = this.computedValue('_originY', data.originY, this.getOriginY());\n    this._flipX = this.computedValue('_flipX', data.flipX, this.getFlipY());\n    this._flipY = this.computedValue('_flipY', data.flipY, this.getFlipY());\n    this._opacity = this.computedValue('_opacity', data.opacity, this.getOpacity());\n    this._value = this.computedValue('_value', data.value, this.getValue());\n  }\n\n  computedValue(key, value, defalultValue) {\n    const {isUndefined} = _util_util__WEBPACK_IMPORTED_MODULE_1__.default;\n    return isUndefined(value) ? defalultValue : value;\n  }\n\n  get type() {\n    return this._type;\n  }\n\n  getValue() {\n    return this._value;\n  }\n\n  setValue(value) {\n    this._value = value;\n    return this;\n  }\n\n  getWidth() {\n    return this._width;\n  }\n\n  setWidth(width) {\n    this._width = width;\n    return this;\n  }\n\n  getHeight() {\n    return this._height;\n  }\n\n  setHeight(height) {\n    this._height = height;\n    return this;\n  }\n\n  getSize() {\n    return {width: this._width, height: this._height};\n  }\n\n  setSize(size) {\n    this._width = size.width;\n    this._height = size.height;\n    return this;\n  }\n\n  getX() {\n    return this._x;\n  }\n\n  setX(x) {\n    this._x = x;\n    return this;\n  }\n\n  getY() {\n    return this._y;\n  }\n\n  setY(y) {\n    this._y = y;\n    return this;\n  }\n\n  getPos() {\n    return {x: this._x, y: this._y};\n  }\n\n  setPos(pos) {\n    this._x = pos.x;\n    this._y = pos.y;\n    return this;\n  }\n\n  getOpacity() {\n    return this._opacity;\n  }\n\n  setOpacity(opacity) {\n    this._opacity = opacity;\n  }\n\n  getOriginX() {\n    return this._originX;\n  }\n\n  setOriginX(x) {\n    this._originX = x;\n    return this;\n  }\n\n  getOriginY(y) {\n    return this._originY;\n  }\n\n  setOriginY() {\n    this._originY = y;\n    return this;\n  }\n\n  getOrigin() {\n    return {x: this._originX, y: this._originY};\n  }\n\n  setOrigin(origin) {\n    this._originX = origin.x;\n    this._originY = origin.y;\n    return this;\n  }\n\n  getAngle() {\n    return this._angle;\n  }\n\n  setAngle(angle) {\n    this._angle = angle;\n    return this;\n  }\n\n  getFlipX() {\n    return this._flipX;\n  }\n\n  setFlipX(x) {\n    this._flipX = x;\n    return this;\n  }\n\n  getFlipY() {\n    return this._flipY;\n  }\n\n  setFlipY(y) {\n    this._flipY = y;\n    return this;\n  }\n\n  isSelected() {\n    return this._selected;\n  }\n\n  select() {\n    this._selected = true;\n    return this;\n  }\n\n  deselect() {\n    this._selected = false;\n    return this;\n  }\n\n  renderCache() {}\n\n  render() {}\n}\n\n_util_util__WEBPACK_IMPORTED_MODULE_1__.default.mixin(Sprite.prototype, _mixin_observable_mixin__WEBPACK_IMPORTED_MODULE_0__.default);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sprite);\n\n//# sourceURL=webpack://CanvasCore/./src/sprite/Sprite.js?");

/***/ }),

/***/ "./src/sprite/Text.js":
/*!****************************!*\
  !*** ./src/sprite/Text.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _constant_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant/constant */ \"./src/constant/constant.js\");\n/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sprite */ \"./src/sprite/Sprite.js\");\n\n\n\n\nclass Text extends _Sprite__WEBPACK_IMPORTED_MODULE_2__.default {\n\n  constructor(props = {}) {\n    super(props);\n    this._type = _constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.SPRITE_TYPE_TEXT;\n    this._fontSize = this.computedValue('_fontSize', props.fontSize, 36);\n    this._fontStyle = this.computedValue('_fontStyle', props.fontStyle, 'normal');\n    this._fontWeight = this.computedValue('_fontWeight', props.fontWeight, 'normal');\n    this._fontFamily = this.computedValue('_fontFamily', props.fontFamily, 'sans-serif');\n    this._textAlign = this.computedValue('_textAlign', props.textAlign, 'center');\n    this._lineHeight = this.computedValue('_lineHeight', props.lineHeight, 1.2);\n    this._fillColor = this.computedValue('_fillColor', props.fillColor, '#FFFFFF');\n    this._strokeColor = this.computedValue('_strokeColor', props.strokeColor, '#FFFFFF');\n    this._value = this.computedValue('_value', props.value, ['Enter Your Text']);\n\n    this.initSize();\n    this.renderCache();\n  }\n\n  encode() {\n    return {\n      ...super.encode(),\n      fontSize: this.getFontSize(),\n      fontStyle: this.getFontStyle(),\n      fontWeight: this.getFontWeight(),\n      fontFamily: this.getFontFamily(),\n      textAlign: this.getTextAlign(),\n      lienHeight: this.getLineHeight(),\n    }\n  }\n\n  decode(data) {\n    super.decode(data);\n    this._fontSize = this.computedValue('_fontSize', data.fontSize, this.getFontSize());\n    this._fontStyle = this.computedValue('_fontStyle', data.fontStyle, this.getFontStyle());\n    this._fontWeight = this.computedValue('_fontWeight', data.fontWeight, this.getFontWeight());\n    this._textAlign = this.computedValue('_textAlgin', data.textAlign, this.getTextAlign());\n    this._lineHeight = this.computedValue('_lineHeight', data.lineHeight, this.getLineHeight());\n    \n    this.initSize();\n    this.renderCache();\n  }\n\n  _calcSize() {\n    return this._value.reduce((finalValue, text) => {\n      let opstions = {\n        fontSize: this._fontSize,\n        fontFamily: this._fontFamily,\n        fontStyle: this._fontStyle,\n        fontWeight: this._fontWeight,\n      }\n      let { width, height } = _util_util__WEBPACK_IMPORTED_MODULE_1__.default.calcTextSize(this._cacheCtx, text, opstions);\n      return {\n        width: Math.max(width, finalValue.width),\n        height: height + finalValue.height,\n      }\n    }, { width: 0, height: 0 })\n  }\n\n  getFontSize() {\n    return this._fontSize;\n  }\n\n  setFontSize(fontSize) {\n    this._fontSize = fontSize;\n    return this;\n  }\n\n  getFontStyle() {\n    return this._fontStyle;\n  }\n\n  setFontStyle(fontStyle) {\n    this._fontStyle = fontStyle;\n    return this;\n  }\n\n  getFontWeight() {\n    return this._fontWeight;\n  }\n\n  setFontWeight(fontWeight) {\n    this._fontWeight = fontWeight;\n    return this;\n  }\n\n  getFontFamily() {\n    return this._fontFamily;\n  }\n\n  setFontFamily(fontFamily) {\n    this._fontFamily = fontFamily;\n    return this;\n  }\n\n  getTextAlign() {\n    return this._textAlign;\n  }\n\n  setTextAlign(textAlign) {\n    this._textAlign = textAlign;\n    return this;\n  }\n\n  getLineHeight() {\n    return this._lineHeight;\n  }\n\n  setLineHeight(lineHeight) {\n    this._lineHeight = lineHeight;\n    return this;\n  }\n\n  getFillColor() {\n    return this._fillColor;\n  }\n\n  setFillColor(color) {\n    this._fillColor = color;\n    return this;\n  }\n\n  getStrokeColor() {\n    return this._strokeColor;\n  }\n\n  setStrokeColor(color) {\n    this._strokeColor = color;\n    return this;\n  }\n\n  initSize() {\n    this.setSize(this._calcSize());\n  }\n\n  renderCache() {\n    let x = 0;\n    let y = 0;\n    switch (this._textAlign) {\n      case 'left':\n        break;\n      case 'center':\n        x = this._width / 2;\n        break;\n      case 'right':\n        x = this._width;\n        break;\n      default:\n    }\n    this._cacheView.width = this._width;\n    this._cacheView.height = this._height;\n    this._cacheCtx.font = `${this._fontStyle} ${this._fontWeight} ${this._fontSize}px ${this._fontFamily}`;\n    this._cacheCtx.fillStyle = this._fillColor;\n    this._cacheCtx.strokeStyle = this._strokeColor;\n    this._cacheCtx.textBaseline = 'top';\n    this._cacheCtx.textAlign = this._textAlign;\n    this._value.forEach((text, index) => {\n      y = index * this._lineHeight * this._fontSize;\n      this._cacheCtx.fillText(text, x, y);\n    });\n  }\n\n  render(ctx) {\n    ctx.drawImage(this._cacheView, this._x, this._y, this._width, this._height);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Text);\n\n//# sourceURL=webpack://CanvasCore/./src/sprite/Text.js?");

/***/ }),

/***/ "./src/util/util.js":
/*!**************************!*\
  !*** ./src/util/util.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _constant_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant/constant */ \"./src/constant/constant.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function () {\n\n  return {\n\n    /**\n     * @description 判断是否为定义\n     * @param {*} source \n     */\n    isUndefined: function (source) {\n      return typeof source === 'undefined';\n    },\n\n    /**\n     * @description 判断是否为对象\n     * @param {*} source \n     */\n    isObject: function (source) {\n      return typeof source === 'object' && source !== null;\n    },\n\n    /**\n     * @description 深拷贝\n     * @param {*} source \n     */\n    deepClone: function (source) {\n      if (this.isObject(source)) {\n        if (Array.isArray(source)) {\n          return source.map(item => this.deepClone(item));\n        } else {\n          let result = {};\n          for (let key in source) {\n            if (Object.prototype.hasOwnProperty.call(source, key)) {\n              result[key] = this.deepClone(source[key]);\n            }\n          }\n          return result;\n        }\n      } else {\n        return source;\n      }\n    },\n\n    /**\n     * @description 混入\n     * @param {*} target \n     * @param {*} source \n     */\n    mixin: function (target, source) {\n      return Object.assign(target, this.deepClone(source));\n    },\n\n    /**\n     * @description 移除指定数组中的指定项\n     * @param array\n     * @param item\n     */\n    removeFromArray: function (array, item) {\n      if (!Array.isArray(array)) {\n        throw _constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.ARGUMENT_ERROR;\n      }\n      let index = array.indexof(item);\n      if (index !== -1) {\n        array.splice(index, 1);\n      }\n    },\n\n    /**\n     * @description 绑定DOM事件\n     * @param {*} target \n     * @param {*} eventName \n     * @param {*} handler \n     */\n    addEventListener: function (target, eventName, handler) {\n      if (!target) {\n        throw new Error(_constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.ARGUMENT_ERROR);\n      }\n\n      if (target.addEventListener) {\n        target.addEventListener(eventName, handler);\n      } else if (target.attachEvent) {\n        target.attachEvent(`on${eventName}`, handler);\n      }\n    },\n\n    /**\n     * @description 解绑DOM事件\n     * @param {*} target \n     * @param {*} eventName \n     * @param {*} handler \n     */\n    removeEventListener: function (target, eventName, handler) {\n      if (!target) {\n        throw new Error(_constant_constant__WEBPACK_IMPORTED_MODULE_0__.default.ARGUMENT_ERROR);\n      }\n\n      if (target.removeEventListener) {\n        target.removeEventListener(eventName, handler);\n      } else if (target.detachEvent) {\n        target.detachEvent(eventName, handler);\n      }\n    },\n\n    /**\n     * @description 设置元素的css\n     * @param {*} element \n     * @param {*} style \n     */\n    css(element, style) {\n      for (let key in style) {\n        if (Object.hasOwnProperty.call(style, key)) {\n          element.style[key] = style[key];\n        }\n      }\n    },\n\n    /**\n     * @description 计算文本的尺寸\n     * @param {*} ctx \n     * @param {stiring} value \n     * @param {object} options\n     * @param {number} options.fontSize\n     * @param {string} options.fontFamily\n     * @param {string} options.fontStyle\n     * @param {string} options.fontWeight\n     * @returns \n     */\n    calcTextSize(ctx, value, options = {}) {\n      let {fontSize, fontFamily, fontStyle, fontWeight} = options;\n      ctx.save();\n      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;\n      let {width, fontBoundingBoxAscent, fontBoundingBoxDescent} = ctx.measureText(value);\n      ctx.restore();\n      return {\n        width,\n        height: fontBoundingBoxAscent + fontBoundingBoxDescent, \n      }\n    },\n  }\n})());\n\n//# sourceURL=webpack://CanvasCore/./src/util/util.js?");

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