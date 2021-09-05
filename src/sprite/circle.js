import constant from '../constant/constant';
import Sprite from './sprite';
import config from '../config/config';
import util from '../util/util';
import Track from './track';

class Circle extends Sprite {
  constructor(props = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_CIRCLE;
    this._value = this.extendsValue(props.value, '#F00');
    this._radius = this.extendsValue(props.radius, 50);
    this._supportNodes = [0, 2, 4, 6, 8, 9];
    this.renderCache();
  }

  decode(data) {
    super.decode(data);
    this.renderCache();
  }

  getWidth() {
    return this._radius * 2;
  }

  setWidth() {
    return this;
  }

  getHeight() {
    return this._radius * 2;
  }

  setHeight() {
    return this;
  }

  setSize() {
    return this;
  }

  /**
   * @description 缩放
   * @param {*} trackNode
   * @param {*} prevEncodeData
   * @param {*} verctor
   */
  _resieze(trackNode, prevEncodeData, verctor) {
    const { x: verctorX } = util.calcPointWithAngle(verctor, this._angle);
    const preRect = {
      x: prevEncodeData.x,
      y: prevEncodeData.y,
      width: prevEncodeData.width,
      height: prevEncodeData.height,
    };
    const preRectWithAngle = util.calcRectWithAngle(preRect, this._angle);
    const { width: prevWidth } = preRectWithAngle;
    const { x: diagonalX, y: diagonalY } = util.calcDiagonalInRect(trackNode, preRectWithAngle);
    const nextRectWithAngle = { ...preRectWithAngle };
    const { LEFT_TOP, RIGHT_TOP, RIGHT_BOTTOM, LEFT_BOTTOM } = Track.TRACK_NODES();
    switch (trackNode) {
      case LEFT_TOP: {
        nextRectWithAngle.height = nextRectWithAngle.width = prevWidth - verctorX;
        nextRectWithAngle.x = diagonalX - nextRectWithAngle.width;
        nextRectWithAngle.y = diagonalY - nextRectWithAngle.height;
        break;
      }
      case RIGHT_TOP:
        nextRectWithAngle.height = nextRectWithAngle.width = prevWidth + verctorX;
        nextRectWithAngle.y = diagonalY - nextRectWithAngle.height;
        break;
      case RIGHT_BOTTOM:
        nextRectWithAngle.height = nextRectWithAngle.width = prevWidth + verctorX;
        break;
      case LEFT_BOTTOM:
        nextRectWithAngle.height = nextRectWithAngle.width = prevWidth - verctorX;
        nextRectWithAngle.x = diagonalX - nextRectWithAngle.width;
        break;
      default:
        break;
    }

    const nextRect = util.calcRectWithAngle(nextRectWithAngle, -this._angle);
    this.setX(nextRect.x)
      .setY(nextRect.y)
      .setRadius(nextRect.width / 2);
  }

  /**
   * @description 返回半径
   * @returns
   */
  getRadius() {
    return this._radius;
  }

  /**
   * @description 设置半径
   * @param {number} radius
   */
  setRadius(radius) {
    this._radius = radius;
  }

  renderCache() {
    const { perPixel } = config;
    const { width, height } = this.rect;
    const _width = width * perPixel;
    const _height = height * perPixel;
    this._cacheView.width = _width;
    this._cacheView.height = _height;
    this._cacheCtx.fillStyle = this._value;
    this._cacheCtx.beginPath();
    this._cacheCtx.arc(_width / 2, _height / 2, this._radius, 0, Math.PI * 2);
    this._cacheCtx.fill();
  }
}

export default Circle;
