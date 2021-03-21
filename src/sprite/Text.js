import constant from "../constant/constant";
import util from "../util/util";
import Sprite from "./Sprite";

class Text extends Sprite {

  constructor(props = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_TEXT;
    this._fontSize = this.computedValue('_fontSize', props.fontSize, 36);
    this._fontStyle = this.computedValue('_fontStyle', props.fontStyle, 'normal');
    this._fontWeight = this.computedValue('_fontWeight', props.fontWeight, 'normal');
    this._fontFamily = this.computedValue('_fontFamily', props.fontFamily, 'sans-serif');
    this._textAlign = this.computedValue('_textAlign', props.textAlign, 'center');
    this._lineHeight = this.computedValue('_lineHeight', props.lineHeight, 1.2);
    this._fillColor = this.computedValue('_fillColor', props.fillColor, '#FFFFFF');
    this._strokeColor = this.computedValue('_strokeColor', props.strokeColor, '#FFFFFF');
    this._value = this.computedValue('_value', props.value, ['Enter Your Text']);

    this.initSize();
    this.renderCache();
  }

  encode() {
    return {
      ...super.encode(),
      fontSize: this.getFontSize(),
      fontStyle: this.getFontStyle(),
      fontWeight: this.getFontWeight(),
      fontFamily: this.getFontFamily(),
      textAlign: this.getTextAlign(),
      lienHeight: this.getLineHeight(),
    }
  }

  decode(data) {
    super.decode(data);
    this._fontSize = this.computedValue('_fontSize', data.fontSize, this.getFontSize());
    this._fontStyle = this.computedValue('_fontStyle', data.fontStyle, this.getFontStyle());
    this._fontWeight = this.computedValue('_fontWeight', data.fontWeight, this.getFontWeight());
    this._textAlign = this.computedValue('_textAlgin', data.textAlign, this.getTextAlign());
    this._lineHeight = this.computedValue('_lineHeight', data.lineHeight, this.getLineHeight());
    
    this.initSize();
    this.renderCache();
  }

  _calcSize() {
    return this._value.reduce((finalValue, text) => {
      let opstions = {
        fontSize: this._fontSize,
        fontFamily: this._fontFamily,
        fontStyle: this._fontStyle,
        fontWeight: this._fontWeight,
      }
      let { width, height } = util.calcTextSize(this._cacheCtx, text, opstions);
      return {
        width: Math.max(width, finalValue.width),
        height: height + finalValue.height,
      }
    }, { width: 0, height: 0 })
  }

  getFontSize() {
    return this._fontSize;
  }

  setFontSize(fontSize) {
    this._fontSize = fontSize;
    return this;
  }

  getFontStyle() {
    return this._fontStyle;
  }

  setFontStyle(fontStyle) {
    this._fontStyle = fontStyle;
    return this;
  }

  getFontWeight() {
    return this._fontWeight;
  }

  setFontWeight(fontWeight) {
    this._fontWeight = fontWeight;
    return this;
  }

  getFontFamily() {
    return this._fontFamily;
  }

  setFontFamily(fontFamily) {
    this._fontFamily = fontFamily;
    return this;
  }

  getTextAlign() {
    return this._textAlign;
  }

  setTextAlign(textAlign) {
    this._textAlign = textAlign;
    return this;
  }

  getLineHeight() {
    return this._lineHeight;
  }

  setLineHeight(lineHeight) {
    this._lineHeight = lineHeight;
    return this;
  }

  getFillColor() {
    return this._fillColor;
  }

  setFillColor(color) {
    this._fillColor = color;
    return this;
  }

  getStrokeColor() {
    return this._strokeColor;
  }

  setStrokeColor(color) {
    this._strokeColor = color;
    return this;
  }

  initSize() {
    this.setSize(this._calcSize());
  }

  renderCache() {
    let x = 0;
    let y = 0;
    switch (this._textAlign) {
      case 'left':
        break;
      case 'center':
        x = this._width / 2;
        break;
      case 'right':
        x = this._width;
        break;
      default:
    }
    this._cacheView.width = this._width;
    this._cacheView.height = this._height;
    this._cacheCtx.font = `${this._fontStyle} ${this._fontWeight} ${this._fontSize}px ${this._fontFamily}`;
    this._cacheCtx.fillStyle = this._fillColor;
    this._cacheCtx.strokeStyle = this._strokeColor;
    this._cacheCtx.textBaseline = 'top';
    this._cacheCtx.textAlign = this._textAlign;
    this._value.forEach((text, index) => {
      y = index * this._lineHeight * this._fontSize;
      this._cacheCtx.fillText(text, x, y);
    });
  }

  render(ctx) {
    ctx.drawImage(this._cacheView, this._x, this._y, this._width, this._height);
  }
}

export default Text;