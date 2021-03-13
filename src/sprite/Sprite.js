import observableMixin from "../mixin/observable.mixin";
import util from "../util/util";

class Sprite {

  constructor(props = {}) {
    this._type = this.updateValue('_type', props.type, '');
    this._x = this.updateValue('_x', props.x, 0);
    this._y = this.updateValue('_y', props.y, 0);
    this._width = this.updateValue('_width', props.width, 0);
    this._height = this.updateValue('_height', props.height, 0);
    this._angle = this.updateValue('_angle', props.angle, 0);
    this._originX = this.updateValue('_originX', props.originX, 0);
    this._originY = this.updateValue('_originY', props.originY, 0);
    this._flipX = this.updateValue('_flipX', props.flipX, 1);
    this._flipY = this.updateValue('_flipY', props.flipY, 0);
    this._opacity = this.updateValue('_opacity', props.opacity, 1);
    this._value = this.updateValue('_value', props.value, '');
    this._selected = false;
    this._cacheView = document.createElement('canvas');
    this._cacheCtx = this._cacheView.getContext('2d');
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
    this.updateValue('_type', data.type, this.getType());
    this.updateValue('_x', data.x, this.getX());
    this.updateValue('_y', data.y, this.getY());
    this.updateValue('_width', data.width, this.getWidth());
    this.updateValue('_height', data.height, this.getHeight());
    this.updateValue('_angle', data.angle, this.getAngle());
    this.updateValue('_originX', data.originX, this.getOriginX());
    this.updateValue('_originY', data.originY, this.getOriginY());
    this.updateValue('_flipX', data.flipX, this.getFlipY());
    this.updateValue('_flipY', data.flipY, this.getFlipY());
    this.updateValue('_opacity', data.opacity, this.getOpacity());
    this.updateValue('_value', data.value, this.getValue());
  }

  updateValue(key, value, defalultValue) {
    const {isUndefined} = util;
    this[key] = isUndefined(value) ? defalultValue : value;
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
}

util.mixin(Sprite.prototype, observableMixin);

export default Sprite;