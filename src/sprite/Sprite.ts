import constant from '../constant/constant';
import eventConstant from '../constant/event-constant';
import {
  angleToRadian,
  calcPointWithAngle,
  calcRectWithAngle,
  calcDiagonalInRect,
  calcPointInRect,
  isPointInRect,
  fixAngle,
  adsorbAngle,
  radianToAngle,
  calcVertor,
  extendsValue,
} from '../util/util';
import Track from './Track';
import { v4 } from 'uuid';
import { EncodeJSON, Pos, Rect, Size, SpriteJSON } from '../types/types';
import ObservableMixin from '../mixin/observable.mixin';
import Base from './Base';

class Sprite extends ObservableMixin(Base) {
  protected _id: string = v4();
  protected _type: string = 'Sprite';
  protected _x: number = 0;
  protected _y: number = 0;
  protected _width: number = 0;
  protected _height: number = 0;
  protected _angle: number = 0;
  protected _originX: number = 0;
  protected _originY: number = 0;
  protected _flipX: number = 0;
  protected _flipY: number = 0;
  protected _opacity: number = 1;
  protected _supportNodes: Array<number>;
  protected _evented: boolean;
  protected _selected: boolean;
  protected _cacheView: HTMLCanvasElement;
  protected _cacheCtx: CanvasRenderingContext2D;
  protected _track: Track;

  constructor(props: SpriteJSON = {}) {
    super();
    this._evented = true;
    this._selected = false;
    this._cacheView = document.createElement('canvas');
    this._cacheCtx = this._cacheView.getContext('2d');
    this._supportNodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1];
    this._track = new Track({ supportNodes: this._supportNodes, owner: this });
    this.fromJSON(props);
  }

  toJSON(): SpriteJSON {
    return {
      id: this.id,
      type: this.type,
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height,
      angle: this._angle,
      originX: this._originX,
      originY: this._originY,
      flipX: this._flipX,
      flipY: this._flipY,
      opacity: this._opacity,
    };
  }

  fromJSON(data: SpriteJSON): this {
    extendsValue.call(this, 'id', data.id, this._id);
    extendsValue.call(this, 'type', data.type, this._type);
    extendsValue.call(this, 'x', data.x, this._x);
    extendsValue.call(this, 'y', data.y, this._y);
    extendsValue.call(this, 'width', data.width, this._width);
    extendsValue.call(this, 'height', data.height, this._height);
    extendsValue.call(this, 'angle', data.angle, this._angle);
    extendsValue.call(this, 'originX', data.originX, this._originX);
    extendsValue.call(this, 'originY', data.originY, this._originY);
    extendsValue.call(this, 'flipX', data.flipX, this._flipX);
    extendsValue.call(this, 'flipY', data.flipY, this._flipY);
    extendsValue.call(this, 'opacity', data.opacity, this._opacity);
    return this;
  }

  /**
   * @type {string}
   */
  get type(): string {
    return this._type;
  }

  /**
   * @type {Object}
   * @property {number} x
   * @property {number} y
   * @property {number} width
   * @property {number} height
   */
  get rect(): Rect {
    return {
      ...this.getPos(),
      ...this.getSize(),
    };
  }

  /**
   * @desc The unique identifier of the Sprite
   * @type {string}
   */
  get id(): string {
    return this._id;
  }

  /**
   * @desc Set the sprite could support the event
   */
  setEventSupport(isSupport: boolean): this {
    this._evented = isSupport;
    return this;
  }

  /**
   * @desc Is the sprite could support the event
   */
  getEventSupport(): boolean {
    return this._evented;
  }

  /**
   * @desc Get the width of the sprite
   * @return {number}
   */
  getWidth(): number {
    return this._width;
  }

  /**
   * @desc Set the width of the sprite
   * @param {number} width
   */
  setWidth(width: number): this {
    this._width = width;
    return this;
  }

  /**
   * @desc Get the height of the sprite
   * @return {number}
   */
  getHeight(): number {
    return this._height;
  }

  /**
   * @desc Set the height of the sprite
   * @param {number} height
   */
  setHeight(height: number): this {
    this._height = height;
    return this;
  }

  /**
   * @desc Set the size of the sprite
   * @return {Object}
   * @property {number} width
   * @property {number} height
   */
  getSize(): Size {
    return { width: this.getWidth(), height: this.getHeight() };
  }

  /**
   * @desc
   * @param {Object}
   * @param {number} width
   * @param {number} height
   */
  setSize(size: Size): this {
    this._width = size.width;
    this._height = size.height;
    return this;
  }

  getX(): number {
    return this._x;
  }

  setX(x: number): this {
    this._x = x;
    return this;
  }

  getY(): number {
    return this._y;
  }

  setY(y: number): this {
    this._y = y;
    return this;
  }

  /**
   * @desc Get the position of the sprite
   * @return {Object}
   * @return {number} x
   * @return {number} y
   */
  getPos(): Pos {
    return { x: this._x, y: this._y };
  }

  /**
   * @desc Set the position of the sprite
   * @param {Object}
   * @param {number} x
   * @param {number} y
   * @return
   */
  setPos(position: Pos): this {
    this._x = position.x;
    this._y = position.y;
    return this;
  }

  getOpacity(): number {
    return this._opacity;
  }

  setOpacity(opacity: number): this {
    this._opacity = opacity;
    return this;
  }

  getOriginX() {
    return this._originX;
  }

  setOriginX(originX: number): this {
    this._originX = originX;
    return this;
  }

  getOriginY() {
    return this._originY;
  }

  setOriginY(originY: number): this {
    this._originY = originY;
    return this;
  }

  /**
   * @desc Get the origin of the sprite
   * @return {Object}
   * @return {number} x
   * @return {number} y
   */
  getOrigin(): Pos {
    return { x: this._originX, y: this._originY };
  }

  /**
   * @desc Set the origin of the sprite
   * @param {Object}
   * @param {number} x
   * @param {number} y
   * @return
   */
  setOrigin(origin: Pos): this {
    this._originX = origin.x;
    this._originY = origin.y;
    return this;
  }

  getAngle(): number {
    return this._angle;
  }

  setAngle(angle: number): this {
    this._angle = angle;
    return this;
  }

  getFlipX(): number {
    return this._flipX;
  }

  setFlipX(x: number): this {
    this._flipX = x;
    return this;
  }

  getFlipY(): number {
    return this._flipY;
  }

  setFlipY(y: number): this {
    this._flipY = y;
    return this;
  }

  isSelected(): boolean {
    return this._selected;
  }

  select() {
    this._selected = true;
    this.fire(eventConstant.SELECTED, { target: this });
    return this;
  }

  deselect() {
    this._selected = false;
    this.fire(eventConstant.DESELECTED, { target: this });
    return this;
  }

  /**
   * @desc Render the sprite to the cache view
   */
  renderCache(): this {
    return this;
  }

  /**
   * @desc Render the cache view to the view
   */
  render(ctx: CanvasRenderingContext2D): this {
    const { WILL_RENDER, DID_RENDER } = eventConstant;
    const { x, y, width, height } = this.rect;
    const horizontalOffset = width / 2;
    const verticalOffset = height / 2;
    this.fire(WILL_RENDER, { target: this });
    ctx.save();
    ctx.translate(x + horizontalOffset, y + verticalOffset);
    ctx.rotate(angleToRadian(this._angle));
    ctx.drawImage(this._cacheView, -horizontalOffset, -verticalOffset, width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
    this.fire(DID_RENDER, { target: this });
    return this;
  }

  /**
   * @desc Render the controller of the sprite
   */
  renderTrack(ctx: CanvasRenderingContext2D, isHover: boolean | undefined): this {
    this._track.render(ctx, isHover);
    return this;
  }

  /**
   * @desc
   * @param {number} trackNode
   * @param {Object} verctor
   * @property {number} verctor.x
   * @property {number} verctor.y
   * @param {SpriteJSON} prevEncodeData
   */
  transform(trackNode: number, verctor: Pos, prevEncodeData: object): this {
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
        break;
      default:
    }
    this.fire(eventConstant.DID_TRANSFORM, { target: this });
    return this;
  }

  /**
   * @desc
   * @param {EncodeJSON} prevEncodeData
   * @param {Object} verctor
   * @property {number} verctor.x
   * @property {number} verctor.y
   */
  _move(prevEncodeData: EncodeJSON, verctor: Pos): this {
    const { x: verctorX, y: verctorY } = verctor;
    const { x: prevX, y: prevY } = prevEncodeData;
    this.setX(prevX + verctorX).setY(prevY + verctorY);
    return this;
  }

  /**
   * @desc
   * @param {number} trackNode
   * @param {EncodeJSON} prevEncodeData
   * @param {Object} verctor
   * @property {number} verctor.x
   * @property {number} verctor.y
   */
  _resieze(trackNode: number, prevEncodeData: EncodeJSON, verctor: Pos): this {
    const { x: verctorX, y: verctorY } = calcPointWithAngle(verctor, this._angle);
    const preRect = {
      x: prevEncodeData.x,
      y: prevEncodeData.y,
      width: prevEncodeData.width,
      height: prevEncodeData.height,
    };
    const preRectWithAngle = calcRectWithAngle(preRect, this._angle);
    const { x: prevX, y: prevY, width: prevWidth, height: prevHeight } = preRectWithAngle;
    const ratio = prevWidth / prevHeight;
    const { x: diagonalX, y: diagonalY } = calcDiagonalInRect(trackNode, preRectWithAngle);
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

    const nextRect = calcRectWithAngle(nextRectWithAngle, -this._angle);
    this.setX(nextRect.x).setY(nextRect.y).setWidth(nextRect.width).setHeight(nextRect.height);
    return this;
  }

  /**
   * @desc
   * @param {Object} verctor
   * @property {number} verctor.x
   * @property {number} verctor.y
   */
  _rotate(verctor: Pos): this {
    let angle;
    const centerPos = calcPointInRect(constant.CENTER, this.rect);
    const { x, y } = calcVertor(centerPos, verctor);
    angle = radianToAngle(Math.atan2(-y, x));
    angle = fixAngle(adsorbAngle(90 - angle));
    this.setAngle(angle);
    return this;
  }

  /**
   * @desc Destory the sprite and remove all listener
   */
  destroy(): void {
    this.fire(eventConstant.WILL_DESTROY, { target: this });
    this.fire(eventConstant.DID_DESTROY);
    this.removeAllListeners();
  }

  /**
   * @desc
   * @param {Object} point
   * @property {number} point.x
   * @property {number} point.y
   * @return {boolean}
   */
  isPointInSelf(point: Pos): boolean {
    return isPointInRect(point, this.rect);
  }

  /**
   * @desc
   * @param {Object} point
   * @property {number} point.x
   * @property {number} point.y
   * @return {number}
   */
  calcTrackNode(point: Pos): number {
    return this._track.clacTrackNodeWithPoint(point);
  }
}

export default Sprite;
