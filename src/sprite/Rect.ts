import config from '../config/config';
import constant from '../constant/constant';
import { RectJSON } from '../types/types';
import { extendsValue } from '../util/util';
import Sprite from './sprite';

class Rect extends Sprite {
  protected _fillColor: string = '#FF0000';

  constructor(props: RectJSON = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_RECT;
    this.fromJSON(props);
    this.renderCache();
  }

  toJSON() {
    return {
      ...super.toJSON(),
      fillColor: this._fillColor,
    };
  }

  fromJSON(data: RectJSON): this {
    super.fromJSON(data);
    extendsValue.call(this, 'fillColor', data.fillColor, this._fillColor);
    return this;
  }

  renderCache(): this {
    const { perPixel } = config;
    this._cacheView.width = this._width * perPixel;
    this._cacheView.height = this._height * perPixel;
    this._cacheCtx.fillStyle = this._fillColor;
    this._cacheCtx.fillRect(0, 0, this._cacheView.width, this._cacheView.height);
    return this;
  }
}

export default Rect;
