import constant from '../constant/constant';
import Sprite from './Sprite';
import config from '../config/config';
import {
  extendsValue,
  calcPointWithAngle,
  calcRectWithAngle,
  calcDiagonalInRect,
} from '../util/util';
import Track from './Track';
import { CircleJSON, EncodeJSON, Pos, Rect } from '../types/types';

class Circle extends Sprite {
  protected _fillColor: string = '#FF0000';
  protected _radius: number = 50;

  constructor(props: CircleJSON = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_CIRCLE;
    this._supportNodes = [0, 2, 4, 6, 8, 9];
    this.fromJSON(props);
    this.renderCache();
  }

  toJSON(): CircleJSON {
    return {
      ...super.toJSON(),
      fillColor: this._fillColor,
      radius: this._radius,
    };
  }

  fromJSON(data: CircleJSON): this {
    super.fromJSON(data);
    extendsValue.call(this, 'fillColor', data.fillColor, this._fillColor);
    extendsValue.call(this, 'radius', data.radius, this._radius);
    return this;
  }

  getWidth(): number {
    return this._radius * 2;
  }

  getHeight(): number {
    return this._radius * 2;
  }

  /**
   * @desc
   * @param {number} trackNode
   * @param {EncodeJSON} prevEncodeData
   * @param {Object} verctor
   * @property {Object} verctor.x
   * @property {Object} verctor.y
   */
  _resieze(trackNode: number, prevEncodeData: EncodeJSON, verctor: Pos): this {
    const { x: verctorX } = calcPointWithAngle(verctor, this._angle);
    const preRect = {
      x: prevEncodeData.x,
      y: prevEncodeData.y,
      width: prevEncodeData.radius * 2,
      height: prevEncodeData.radius * 2,
    };
    const preRectWithAngle = calcRectWithAngle(preRect, this._angle);
    const { width: prevWidth } = preRectWithAngle;
    const { x: diagonalX, y: diagonalY } = calcDiagonalInRect(trackNode, preRectWithAngle);
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

    const nextRect = calcRectWithAngle(nextRectWithAngle, -this._angle);
    return this.setX(nextRect.x)
      .setY(nextRect.y)
      .setRadius(nextRect.width / 2);
  }

  getRadius(): number {
    return this._radius;
  }

  setRadius(radius: number): this {
    this._radius = radius;
    return this;
  }

  renderCache(): this {
    const { perPixel } = config;
    const { width, height } = this.rect;
    const _width = width * perPixel;
    const _height = height * perPixel;
    this._cacheView.width = _width;
    this._cacheView.height = _height;
    this._cacheCtx.fillStyle = this._fillColor;
    this._cacheCtx.beginPath();
    this._cacheCtx.arc(_width / 2, _height / 2, this._radius, 0, Math.PI * 2);
    this._cacheCtx.fill();
    return this;
  }
}

export default Circle;
