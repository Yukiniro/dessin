import constant from "../constant/constant";
import Sprite from "./Sprite";

class Text extends Sprite {

  constructor(props = {}) {
    super(_props);
    this._type = constant.SPRITE_TYPE_TEXT;
    this._fontSize = props.fontSize || 16;
    this._fontStyle = props.fontStyle || 'normal';
    this._fontWeight = props.fontWeight || 'noramal';
    this._fontFamily = props.fontFamily|| 'Times New Roman';
    this._textCenter = props.textAlign || 'center';
    this._lineHeight = props.lineHeight || 1.2;
    this._text = props.text || '';
  }

  getText() {
    return this._text;
  }

  setText(text) {
    this._text = text;
    return this;
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

  renderCache() {
    this._cacheView.width
  }

  render() {

  }

}

export default Text;