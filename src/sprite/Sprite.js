import observableMixin from "../mixin/observable.mixin";
import util from "../util/util";
import Track from "./Track";

class Sprite {

  constructor(props = {}) {
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

  encode() {
    return {
      type: this.type,
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      hieght:this.getHeight(),
      angle: this.getAngle(),
      originX: this.getOriginX(),
      originY: this.getOriginY(),
      flipX: this.getFlipX(),
      flipY: this.getFlipY(),
      opacity: this.getOpacity(),
      value: this.getValue(),
    }
  }

  decode(data) {
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

  computedValue(key, value, defalultValue) {
    const {isUndefined} = util;
    return isUndefined(value) ? defalultValue : value;
  }

  get type() {
    return this._type;
  }

  getValue() {
    return this._value;
  }

  setValue(value) {
    this._value = value;
    return this;
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

  renderTrack(ctx) {
    this._track = this._track || new Track({supportNodes: this._supportNodes});
    this._track.render(ctx, this._x, this._y, this._width, this._height);
  }
}

util.mixin(Sprite.prototype, observableMixin);

export default Sprite;