import constant from '../constant/constant';
import Sprite from './sprite';
import config from '../config/config';
import {
  extendsValue,
  calcPointWithAngle,
  calcRectWithAngle,
  calcDiagonalInRect,
} from '../util/util';
import Track from './track';
import { CircleJSON, Pos, Rect } from '../types/types';

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
   * @description 缩放
   * @param {*} trackNode
   * @param {*} prevEncodeData
   * @param {*} verctor
   */
  _resieze(trackNode: number, prevEncodeData: Rect, verctor: Pos): this {
    const { x: verctorX } = calcPointWithAngle(verctor, this._angle);
    const preRect = {
      x: prevEncodeData.x,
      y: prevEncodeData.y,
      width: prevEncodeData.width,
      height: prevEncodeData.height,
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

  /**
   * @description 返回半径
   * @returns
   */
  getRadius(): number {
    return this._radius;
  }

  /**
   * @description 设置半径
   * @param {number} radius
   */
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
