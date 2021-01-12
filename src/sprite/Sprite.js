import observableMixin from "../mixin/observable.mixin";
import util from "../util/util";

class Sprite {

  constructor(props = {}) {
    let _props = {
      width: 1,
      heihgt: 1,
      angle: 0,
      originX: 0,
      originY: 0,
      flipX: 1,
      flipY: 1,
      x: 0,
      y: 0,
      opacity: 1,
      ...props,
    }

    for (let i in _props) {
      if (Object.prototype.hasOwnProperty.call(_props, i)) {
        this[`_${i}`] = _props[i];
      }
    }

    this._selected = false;
    this._cacheView = document.createElement('canvas');
    this._cacheCtx = this._cacheView.getContext('2d');
  }

  getWidth() {
    return this._width;
  }

  setWidth(width) {
    this._width = width;
    return this;
  }

  getHeight() {
    return this._height;
  }

  setHeight(height) {
    this._height = height;
    return this;
  }

  getSize() {
    return {width: this._width, height: this._height};
  }

  setSize(size) {
    this._width = size.width;
    this._height = size.height;
    return this;
  }

  getX() {
    return this._x;
  }

  setX(x) {
    this._x = x;
    return this;
  }

  getY() {
    return this._y;
  }

  setY(y) {
    this._y = y;
    return this;
  }

  getPos() {
    return {x: this._x, y: this._y};
  }

  setPos(pos) {
    this._x = pos.x;
    this._y = pos.y;
    return this;
  }

  getOpacity() {
    return this._opacity;
  }

  setOpacity(opacity) {
    this._opacity = opacity;
  }

  getOriginX() {
    return this._originX;
  }

  setOriginX(x) {
    this._originX = x;
    return this;
  }

  getOriginY(y) {
    return this._originY;
  }

  setOriginY() {
    this._originY = y;
    return this;
  }

  getOrigin() {
    return {x: this._originX, y: this._originY};
  }

  setOrigin(origin) {
    this._originX = origin.x;
    this._originY = origin.y;
    return this;
  }

  getAngle() {
    return this._angle;
  }

  setAngle(angle) {
    this._angle = angle;
    return this;
  }

  getFlipX() {
    return this._flipX;
  }

  setFlipX(x) {
    this._flipX = x;
    return this;
  }

  getFlipY() {
    return this._flipY;
  }

  setFlipY(y) {
    this._flipY = y;
    return this;
  }

  isSelected() {
    return this._selected;
  }

  select() {
    this._selected = true;
    return this;
  }

  deselect() {
    this._selected = false;
    return this;
  }

  renderCache() {}

  render() {}
}

util.mixin(Sprite.prototype, observableMixin);

export default Sprite;