import config from '../config/config';
import constant from '../constant/constant';
import { TextJSON, TextSize } from '../types/types';
import { extendsValue, calcTextSize } from '../util/util';
import Sprite from './sprite';
import { clone } from 'bittydash';

class Text extends Sprite {
  protected _fontSize: number = 36;
  protected _fontStyle: string = 'normal';
  protected _fontWeight: number | string = 'normal';
  protected _fontFamily: string = 'sans-serif';
  protected _textAlign: string = 'center';
  protected _lineHeight: number = 1.2;
  protected _fillColor: string = '#000000';
  protected _strokeColor: string = '#FFFFFF';
  protected _texts: Array<string> = ['Enter Your Text'];
  protected _fontBoundingBoxAscent: number = 0;

  constructor(props: TextJSON = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_TEXT;
    this._supportNodes = [0, 2, 3, 4, 6, 7, 9];
    this._fontBoundingBoxAscent = 0;
    this.fromJSON(props);
    this.initSize();
    this.renderCache();
  }

  toJSON(): TextJSON {
    return {
      ...super.toJSON(),
      fontSize: this._fontSize,
      fontStyle: this._fontStyle,
      fontWeight: this._fontWeight,
      fontFamily: this._fontFamily,
      textAlign: this._textAlign,
      lineHeight: this._lineHeight,
      fillColor: this._fillColor,
      strokeColor: this._strokeColor,
      texts: clone(this._texts, true),
    };
  }

  fromJSON(data: TextJSON): this {
    super.fromJSON(data);
    extendsValue.call(this, 'fontSize', data.fontSize, this._fontSize);
    extendsValue.call(this, 'fontStyle', data.fontStyle, this._fontStyle);
    extendsValue.call(this, 'fontWeight', data.fontWeight, this._fontWeight);
    extendsValue.call(this, 'textAlign', data.textAlign, this._textAlign);
    extendsValue.call(this, 'lineHeight', data.lineHeight, this._lineHeight);
    extendsValue.call(this, 'texts', clone(data.texts, true), this._texts);
    this.initSize();
    this.renderCache();
    return this;
  }

  /**
   * @desc
   * @return {Object} info
   * @return {number} info.width
   * @return {number} info.height
   * @return {number} info.fontBoundingBoxAscent
   */
  _calcSize(): TextSize {
    return this._texts.reduce(
      (finalValue, text) => {
        const opstions = {
          fontSize: this._fontSize,
          fontFamily: this._fontFamily,
          fontStyle: this._fontStyle,
          fontWeight: this._fontWeight,
        };
        const { width, height, fontBoundingBoxAscent } = calcTextSize(
          this._cacheCtx,
          text,
          opstions
        );
        return {
          width: Math.max(width, finalValue.width),
          height: height + finalValue.height,
          fontBoundingBoxAscent,
        };
      },
      { width: 0, height: 0, fontBoundingBoxAscent: 0 }
    );
  }

  getFontSize(): number {
    return this._fontSize;
  }

  setFontSize(fontSize: number): this {
    this._fontSize = fontSize;
    return this;
  }

  getFontStyle(): string {
    return this._fontStyle;
  }

  setFontStyle(fontStyle: string): this {
    this._fontStyle = fontStyle;
    return this;
  }

  getFontWeight(): string | number {
    return this._fontWeight;
  }

  setFontWeight(fontWeight: string | number): this {
    this._fontWeight = fontWeight;
    return this;
  }

  getFontFamily(): string {
    return this._fontFamily;
  }

  setFontFamily(fontFamily: string): this {
    this._fontFamily = fontFamily;
    return this;
  }

  getTextAlign(): string {
    return this._textAlign;
  }

  setTextAlign(textAlign: string): this {
    this._textAlign = textAlign;
    return this;
  }

  getLineHeight(): number {
    return this._lineHeight;
  }

  setLineHeight(lineHeight: number): this {
    this._lineHeight = lineHeight;
    return this;
  }

  getFillColor(): string {
    return this._fillColor;
  }

  setFillColor(color: string): this {
    this._fillColor = color;
    return this;
  }

  getStrokeColor(): string {
    return this._strokeColor;
  }

  setStrokeColor(color: string): this {
    this._strokeColor = color;
    return this;
  }

  /**
   * @desc Init the size of the text.
   */
  initSize(): this {
    const { width, height, fontBoundingBoxAscent } = this._calcSize();
    this.setSize({ width, height });
    this._fontBoundingBoxAscent = fontBoundingBoxAscent;
    return this;
  }

  renderCache(): this {
    const { perPixel } = config;
    let x = 0;
    let y = 0;
    const width = this._width * perPixel;
    const height = this._height * perPixel;
    const fontSize = this._fontSize * perPixel;
    switch (this._textAlign) {
      case 'left':
        break;
      case 'center':
        x = width / 2;
        break;
      case 'right':
        x = width;
        break;
      default:
    }
    this._cacheView.width = width;
    this._cacheView.height = height;
    this._cacheCtx.font = `${this._fontStyle} ${this._fontWeight} ${fontSize}px ${this._fontFamily}`;
    this._cacheCtx.fillStyle = this._fillColor;
    this._cacheCtx.strokeStyle = this._strokeColor;
    this._cacheCtx.textAlign = this._textAlign as CanvasTextAlign;
    this._texts.forEach((text, index) => {
      y = index * this._lineHeight * fontSize + this._fontBoundingBoxAscent;
      this._cacheCtx.fillText(text, x, y);
    });

    return this;
  }
}

export default Text;
