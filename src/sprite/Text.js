import constant from "../constant/constant";
import Sprite from "./Sprite";

class Text extends Sprite {

  constructor(props = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_TEXT;
    this._fontSize = this.updateValue('_fontSize', props.fontSize, 16);
    this._fontStyle = this.updateValue('_fontStyle', props.fontStyle, 'normal');
    this._fontWeight = this.updateValue('_fontWeight', props.fontWeight, 'normal');
    this._fontFamily = this.updateValue('_fontFamily', props.fontFamily, 'normal');
    this._textAlign = this.updateValue('_textAlign', props.textAlign, 'center');
    this._lineHeight = this.updateValue('_lineHeight', props.lineHeight, 1.2);
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
    this.fontSize = this.updateValue('_fontSize', data.fontSize, this.getFontSize());
    this.fontStyle = this.updateValue('_fontStyle', data.fontStyle, this.getFontStyle());
    this.fontWeight = this.updateValue('_fontWeight', data.fontWeight, this.getFontWeight());
    this.textAlign = this.updateValue('_textAlgin', data.textAlign, this.getTextAlign());
    this.lineHeight = this.updateValue('_lineHeight', data.lineHeight, this.getLineHeight());
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

}

export default Text;