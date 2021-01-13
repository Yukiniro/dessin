import constant from "../constant/constant";
import Sprite from "./Sprite";

class Text extends Sprite {

  constructor(props = {}) {
    let _props = {
      type: constant.SPRITE_TYPE_TEXT,
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontFamily: 'Times New Roman',
      textAlign: 'center',
      lineHeight: 1.2,
      text: '',
      ...props,
    }
    super(_props);
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
    
  }

  render() {

  }

}

export default Text;