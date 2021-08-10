import constant from '../constant/constant';
import observableMixin from '../mixin/observable.mixin';
import util from '../util/util';
import Track from './Track';

class Sprite {
  constructor(props = {}) {
    const { emptyFunc } = util;

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

    this._onCreated = this.computedValue(
      '_onCreated',
      props.onCreated,
      emptyFunc
    );
    this._onWillTransform = this.computedValue(
      '_onWillTransform',
      props.onWillRender,
      emptyFunc
    );
    this._onDidTransfrom = this.computedValue(
      '_onDidTransfrom',
      props.onDidTransfrom,
      emptyFunc
    );
    this._onWillRender = this.computedValue(
      '_onWillRender',
      props.onWillRender,
      emptyFunc
    );
    this._onDidRender = this.computedValue(
      '_onDidRender',
      props.onDidRender,
      emptyFunc
    );
    this._onWillDestroy = this.computedValue(
      '_onWillDestroy',
      props.onWillDestroy,
      emptyFunc
    );
    this._onDidDestroy = this.computedValue(
      '_onDidDestroy',
      props.onDidDestroy,
      emptyFunc
    );

    this.triggerLifecycle('created');
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

  triggerLifecycle() {
    const args = Array.from(arguments);
    const type = args.shift();
    switch (type) {
      case 'created':
        this._onCreated(...args);
        break;
      case 'willTransform':
        this._onWillTransform(...args);
        break;
      case 'didTransform':
        this._onDidTransfrom(...args);
        break;
      case 'willRender':
        this._onWillRender(...args);
        break;
      case 'didRender':
        this._onDidRender(...args);
        break;
      case 'willDestroy':
        this._onWillDestroy(...args);
        break;
      case 'didDestroy':
        this._onDidDestroy(...argus);
        break;
      default:
    }
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

export default Sprite;
