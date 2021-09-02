import config from '../config/config';
import constant from '../constant/constant';
import Sprite from './sprite';

class Rect extends Sprite {
  constructor(props = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_RECT;
    this._value = this.extendsValue(props.value, '#F00');
    this.renderCache();
  }

  decode(data) {
    super.decode(data);
    this.renderCache();
  }

  renderCache() {
    const { perPixel } = config;
    this._cacheView.width = this._width * perPixel;
    this._cacheView.height = this._height * perPixel;
    this._cacheCtx.fillStyle = this._value;
    this._cacheCtx.fillRect(0, 0, this._cacheView.width, this._cacheView.height);
  }
}

export default Rect;
