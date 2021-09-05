import constant from '../constant/constant';
import eventConstant from '../constant/event-constant';
import observableMixin from '../mixin/observable.mixin';
import util from '../util/util';
import Track from './track';
import { v4 } from 'uuid';

class Sprite {
  constructor(props = {}) {
    this._id = v4();
    this._type = this.extendsValue(props.type, '');
    this._x = this.extendsValue(props.x, 0);
    this._y = this.extendsValue(props.y, 0);
    this._width = this.extendsValue(props.width, 0);
    this._height = this.extendsValue(props.height, 0);
    this._angle = this.extendsValue(props.angle, 0);
    this._originX = this.extendsValue(props.originX, 0);
    this._originY = this.extendsValue(props.originY, 0);
    this._flipX = this.extendsValue(props.flipX, 1);
    this._flipY = this.extendsValue(props.flipY, 0);
    this._opacity = this.extendsValue(props.opacity, 1);
    this._value = this.extendsValue(props.value, '');
    this._supportNodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1];
    this._evented = this.extendsValue(props._evented, true);
    this._selected = false;
    this._cacheView = document.createElement('canvas');
    this._cacheCtx = this._cacheView.getContext('2d');
    this._track = null;
  }

  encode() {
    return {
      id: this.id,
      type: this.type,
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      height: this.getHeight(),
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
    this._id = this.extendsValue(data.id, v4());
    this._type = this.extendsValue(data.type, this.getType());
    this._x = this.extendsValue(data.x, this.getX());
    this._y = this.extendsValue(data.y, this.getY());
    this._width = this.extendsValue(data.width, this.getWidth());
    this._height = this.extendsValue(data.height, this.getHeight());
    this._angle = this.extendsValue(data.angle, this.getAngle());
    this._originX = this.extendsValue(data.originX, this.getOriginX());
    this._originY = this.extendsValue(data.originY, this.getOriginY());
    this._flipX = this.extendsValue(data.flipX, this.getFlipY());
    this._flipY = this.extendsValue(data.flipY, this.getFlipY());
    this._opacity = this.extendsValue(data.opacity, this.getOpacity());
    this._value = this.extendsValue(data.value, this.getValue());
  }

  extendsValue(value, defalultValue) {
    return util.isUndefined(value) ? defalultValue : value;
  }

  /**
   * @description 返回类型
   */
  get type() {
    return this._type;
  }

  /**
   * @description 返回渲染框的信息
   */
  get rect() {
    return {
      ...this.getPos(),
      ...this.getSize(),
    };
  }

  /**
   * @description 返回id
   */
  get id() {
    return this._id;
  }

  /**
   * @description 设置是否支持事件
   * @param {boolean} isSupport
   */
  setEventSupport(isSupport) {
    this._evented = isSupport;
  }

  /**
   * @description 返回是否支持事件
   * @returns
   */
  getEventSuppor() {
    return this._evented;
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
    return { width: this.getWidth(), height: this.getHeight() };
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
    this.fire(eventConstant.SELECTED, { target: this });
    return this;
  }

  /**
   * @description 取消元素选中
   * @returns
   */
  deselect() {
    this._selected = false;
    this.fire(eventConstant.DESELECTED, { target: this });
    return this;
  }

  /**
   * @description 渲染缓存
   */
  renderCache() {}

  /**
   * @description 渲染元素
   */
  render(ctx) {
    const { WILL_RENDER, DID_RENDER } = eventConstant;
    const { x, y, width, height } = this.rect;
    const horizontalOffset = width / 2;
    const verticalOffset = height / 2;
    this.fire(WILL_RENDER, { target: this });
    ctx.save();
    ctx.translate(x + horizontalOffset, y + verticalOffset);
    ctx.rotate(util.angleToRadian(this._angle));
    ctx.drawImage(this._cacheView, -horizontalOffset, -verticalOffset, width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
    this.fire(DID_RENDER, { target: this });
  }

  /**
   * @description 渲染控制器
   * @param {*} ctx
   */
  renderTrack(ctx) {
    this._track = this._track || new Track({ supportNodes: this._supportNodes, owner: this });
    this._track.render(ctx);
  }

  /**
   * @description 事件交互
   * @param {number} trackNode 控制器节点类型
   * @param {object} verctor 交互向量
   * @param {number} verctor.x
   * @param {number} verctor.y
   * @param {object} prevEncodeData
   */
  transform(trackNode, verctor, prevEncodeData) {
    const {
      SELF,
      LEFT_TOP,
      CENTER_TOP,
      RIGHT_TOP,
      RIGHT_CENTER,
      RIGHT_BOTTOM,
      CENTER_BOTTOM,
      LEFT_BOTTOM,
      LEFT_CETNER,
      ROTATE,
    } = Track.TRACK_NODES();
    this.fire(eventConstant.WILL_TRANSFORM, { target: this });
    switch (trackNode) {
      case SELF:
        this._move(prevEncodeData, verctor);
        break;
      case LEFT_TOP:
      case CENTER_TOP:
      case RIGHT_TOP:
      case RIGHT_CENTER:
      case RIGHT_BOTTOM:
      case CENTER_BOTTOM:
      case LEFT_BOTTOM:
      case LEFT_CETNER:
        this._resieze(trackNode, prevEncodeData, verctor);
        break;
      case ROTATE:
        this._rotate(verctor);
      default:
    }
    this.fire(eventConstant.DID_TRANSFORM, { target: this });
    return this;
  }

  /**
   * @description 移动
   * @param {*} prevEncodeData
   * @param {*} verctor
   */
  _move(prevEncodeData, verctor) {
    const { x: verctorX, y: verctorY } = verctor;
    const { x: prevX, y: prevY } = prevEncodeData;
    this.setX(prevX + verctorX).setY(prevY + verctorY);
  }

  /**
   * @description 缩放
   * @param {*} trackNode
   * @param {*} prevEncodeData
   * @param {*} verctor
   */
  _resieze(trackNode, prevEncodeData, verctor) {
    const { x: verctorX, y: verctorY } = util.calcPointWithAngle(verctor, this._angle);
    const preRect = {
      x: prevEncodeData.x,
      y: prevEncodeData.y,
      width: prevEncodeData.width,
      height: prevEncodeData.height,
    };
    const preRectWithAngle = util.calcRectWithAngle(preRect, this._angle);
    const { x: prevX, y: prevY, width: prevWidth, height: prevHeight } = preRectWithAngle;
    const ratio = prevWidth / prevHeight;
    const { x: diagonalX, y: diagonalY } = util.calcDiagonalInRect(trackNode, preRectWithAngle);
    const nextRectWithAngle = { ...preRectWithAngle };
    const {
      LEFT_TOP,
      CENTER_TOP,
      RIGHT_TOP,
      RIGHT_CENTER,
      RIGHT_BOTTOM,
      CENTER_BOTTOM,
      LEFT_BOTTOM,
      LEFT_CETNER,
    } = Track.TRACK_NODES();
    switch (trackNode) {
      case LEFT_TOP: {
        nextRectWithAngle.width = prevWidth - verctorX;
        nextRectWithAngle.height = nextRectWithAngle.width / ratio;
        nextRectWithAngle.x = diagonalX - nextRectWithAngle.width;
        nextRectWithAngle.y = diagonalY - nextRectWithAngle.height;
        break;
      }
      case CENTER_TOP:
        nextRectWithAngle.y = prevY + verctorY;
        nextRectWithAngle.height = prevHeight - verctorY;
        break;
      case RIGHT_TOP:
        nextRectWithAngle.width = prevWidth + verctorX;
        nextRectWithAngle.height = nextRectWithAngle.width / ratio;
        nextRectWithAngle.y = diagonalY - nextRectWithAngle.height;
        break;
      case RIGHT_CENTER:
        nextRectWithAngle.width = prevWidth + verctorX;
        break;
      case RIGHT_BOTTOM:
        nextRectWithAngle.width = prevWidth + verctorX;
        nextRectWithAngle.height = nextRectWithAngle.width / ratio;
        break;
      case CENTER_BOTTOM:
        nextRectWithAngle.height = prevHeight + verctorY;
        break;
      case LEFT_BOTTOM:
        nextRectWithAngle.width = prevWidth - verctorX;
        nextRectWithAngle.height = nextRectWithAngle.width / ratio;
        nextRectWithAngle.x = diagonalX - nextRectWithAngle.width;
        break;
      case LEFT_CETNER:
        nextRectWithAngle.x = prevX + verctorX;
        nextRectWithAngle.width = prevWidth - verctorX;
        break;
      default:
        break;
    }

    const nextRect = util.calcRectWithAngle(nextRectWithAngle, -this._angle);
    this.setX(nextRect.x).setY(nextRect.y).setWidth(nextRect.width).setHeight(nextRect.height);
  }

  /**
   * @description 旋转
   * @param {*} verctor
   */
  _rotate(verctor) {
    let angle;
    const centerPos = util.calcPointInRect(constant.CENTER, this.rect);
    const { x, y } = util.calcVertor(centerPos, verctor);
    angle = util.radianToAngle(Math.atan2(-y, x));
    angle = util.fixAngle(util.adsorbAngle(90 - angle));
    this.setAngle(angle);
  }

  /**
   * @description 删除对象
   */
  destroy() {
    this.fire(eventConstant.WILL_DESTROY, { target: this });
    this.resetListener();
    this.fire(eventConstant.DID_DESTROY);
  }

  /**
   * @description 判断点是否在对象内
   * @param {object} point
   * @param {number} point.x
   * @param {number} point.y
   * @returns {boolean}
   */
  isPointInSelf(point) {
    return util.isPointInRect(point, this.rect);
  }

  /**
   * @description 计算指定point在sprite中的控制器节点类型
   * @param {object} point
   * @param {number} point.x
   * @param {number} point.y
   * @returns
   */
  calcTrackNode(point) {
    return this._track.clacTrackNodeWithPoint(point);
  }
}

util.mixin(Sprite.prototype, observableMixin);

export default Sprite;
