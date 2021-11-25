import constant from '../constant/constant';
import { Font, Pos, Rect } from '../types/types';

const { hasOwnProperty } = Object.prototype;

/**
 * @desc Check whether the value is undefined
 * @param value
 * @returns {boolean}
 */
export function isUndefined(value: any): boolean {
  return value === void 0;
}

export function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

export function deepClone(value: any): any {
  if (isObject(value)) {
    if (Array.isArray(value)) {
      return value.map((item) => deepClone(item));
    } else {
      const result: {[key: string]: any} = {};
      for (let key in value) {
        if (hasOwnProperty.call(value, key)) {
          result[key] = value[key];
        }
      }

      return result;
    }
  } else {
    return value;
  }
}

export function removeFromArray(array: Array<any>, item: any): void {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

export function addEventListener(
  target: EventTarget,
  eventName: string,
  handler: (a: Event) => void
): void {
  target.addEventListener(eventName, handler);
}

export function removeEventListener(
  target: EventTarget,
  eventName: string,
  handler: (a: Event) => void
): void {
  target.removeEventListener(eventName, handler);
}

export function css(element: HTMLElement, style: {[key: string]: any}): void {
  for (let key in style) {
    if (hasOwnProperty.call(element, key)) {
      element.style[key as unknown as number] = style[key];
    }
  }
}

// 计算文本尺寸
export function calcTextSize(
  ctx: CanvasRenderingContext2D,
  value: string,
  options: Font
): { width: number; height: number; fontBoundingBoxAscent: number } {
  const { fontSize, fontFamily, fontStyle, fontWeight } = options;
  ctx.save();
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
  const { width, fontBoundingBoxAscent, fontBoundingBoxDescent } = ctx.measureText(value);
  ctx.restore();
  return {
    width,
    height: fontBoundingBoxAscent + fontBoundingBoxDescent,
    fontBoundingBoxAscent,
  };
}

export function renderLine(
  ctx: CanvasRenderingContext2D,
  startPos: Pos,
  endPos: Pos,
  color: string,
  options: { dash?: Array<number> }
): void {
  const { x: startX, y: startY } = startPos;
  const { x: endX, y: endY } = endPos;
  const dash = (options && options.dash) || [];
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.setLineDash(dash);
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

/**
 * @desc Get the position in the area
 * @param {string} type
 * @param {object} rect
 * @param {number} rect.x
 * @param {number} rect.y
 * @param {number} rect.width
 * @param {number} rect.height
 * @returns
 */
export function calcPointInRect(type: number, rect: Rect): Pos {
  const { x, y, width, height } = rect;
  let point = { x: 0, y: 0 };
  switch (type) {
    case constant.LEFT_TOP:
      point = { x, y };
      break;
    case constant.CENTER_TOP:
      point = { x: x + width / 2, y };
      break;
    case constant.RIGHT_TOP:
      point = { x: x + width, y };
      break;
    case constant.RIGHT_CENTER:
      point = { x: x + width, y: y + height / 2 };
      break;
    case constant.RIGHT_BOTTOM:
      point = { x: x + width, y: y + height };
      break;
    case constant.CENTER_BOTTOM:
      point = { x: x + width / 2, y: y + height };
      break;
    case constant.LEFT_BOTTOM:
      point = { x, y: y + height };
      break;
    case constant.LEFT_CENTER:
      point = { x, y: y + height / 2 };
      break;
    case constant.CENTER:
      point = { x: x + width / 2, y: y + height / 2 };
      break;
    default:
  }

  return point;
}

export function calcDiagonalInRect(type: number, rect: Rect): Pos {
  let point = { x: 0, y: 0 };
  switch (type) {
    case constant.LEFT_TOP:
      point = this.calcPointInRect(constant.RIGHT_BOTTOM, rect);
      break;
    case constant.CENTER_TOP:
      point = this.calcPointInRect(constant.CENTER_BOTTOM, rect);
      break;
    case constant.RIGHT_TOP:
      point = this.calcPointInRect(constant.LEFT_BOTTOM, rect);
      break;
    case constant.RIGHT_CENTER:
      point = this.calcPointInRect(constant.LEFT_CENTER, rect);
      break;
    case constant.RIGHT_BOTTOM:
      point = this.calcPointInRect(constant.LEFT_TOP, rect);
      break;
    case constant.CENTER_BOTTOM:
      point = this.calcPointInRect(constant.CENTER_TOP, rect);
      break;
    case constant.LEFT_BOTTOM:
      point = this.calcPointInRect(constant.RIGHT_TOP, rect);
      break;
    case constant.LEFT_CENTER:
      point = this.calcPointInRect(constant.RIGHT_CENTER, rect);
      break;
    default:
      point = this.calcPointInRect(type, rect);
  }
  return point;
}

export function emptyFunc(): void {}

export function isPointInRect(point: Pos, rect: Rect): boolean {
  const { x: px, y: py } = point;
  const { x, y, width, height } = rect;
  return px >= x && px <= x + width && py >= y && py <= y + height;
}

export function calcCursorPoint(mouseEvent: MouseEvent) {
  return {
    x: mouseEvent.clientX,
    y: mouseEvent.clientY,
  };
}

/**
 * @desc 计算两点之间的距离
 * @param {object} point1
 * @param {number} point1.x
 * @param {number} point1.y
 * @param {object} point2
 * @param {number} point2.x
 * @param {number} point2.y
 * @returns
 */
export function calcDistance(point1: Pos, point2: Pos): number {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  const offsetX = Math.abs(x2 - x1);
  const offsetY = Math.abs(y2 - y1);
  return Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
}

/**
     * @description 计算point2相对于point1的向量
  bject} point1
     * @param {number} point1.x
     * @param {number} point1.y
     * @param {object} point2
     * @param {number} point2.x
     * @param {number} point2.y
     * @returns
     */
export function calcVertor(point1: Pos, point2: Pos): Pos {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  return {
    x: x2 - x1,
    y: y2 - y1,
  };
}

export function clearCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
}

/**
 * @description 角度转弧度
 * @param {number} angle
 * @returns
 */
export function angleToRadian(angle: number): number {
  return (angle / 180) * Math.PI;
}

/**
 * @description 弧度转角度
 * @param {number} radian
 * @returns
 */
export function radianToAngle(radian: number): number {
  return (radian / Math.PI) * 180;
}

export function toFixed(value: number, digits: number): number {
  return Number(Number(value).toFixed(digits));
}

/**
 * @description 限定角度值在0 -- 360之间
 * @param {number} angle
 * @returns
 */
export function fixAngle(angle: number): number {
  let value = angle;
  while (value < 0 || value > 360) {
    if (value < 0) value += 360;
    if (value >= 360) value -= 360;
  }
  return value;
}

/**
 * @description 吸附角度
 * @param {number} angle
 * @param {number} offset 吸附差值
 * @returns
 */
export function adsorbAngle(angle: number, offset = 6): number {
  const angleToAbsorb = [0, 90, 180, 270, 360];
  const ang = this.fixAngle(angle);
  const index = angleToAbsorb.findIndex((value) => Math.abs(value - ang) <= offset);
  return index === -1 ? ang : angleToAbsorb[index];
}

/**
 * @description 计算point在canvas坐标系旋转angle后的新坐标
 * @param {object} point
 * @param {number} point.x
 * @param {number} point.y
 * @param {number} angle
 * @returns
 */
export function calcPointWithAngle(point: Pos, angle: number): Pos {
  const { x, y } = point;
  const radian = this.angleToRadian(angle);
  const nextX = x * Math.cos(radian) + y * Math.sin(radian);
  const nextY = y * Math.cos(radian) - x * Math.sin(radian);
  return {
    x: nextX,
    y: nextY,
  };
}

/**
 * @description 计算rect在canvas坐标系旋转angle后的新rect
 * @param {object} rect
 * @param {number} rect.x
 * @param {number} rect.y
 * @param {number} rect.width
 * @param {number} rect.height
 * @param {number} angle
 * @returns
 */
export function calcRectWithAngle(rect: Rect, angle: number): Rect {
  const { width, height } = rect;
  const centerPoint = this.calcPointInRect(constant.CENTER, rect);
  const nextCenterPoint = this.calcPointWithAngle(centerPoint, angle);
  const nextX = nextCenterPoint.x - width / 2;
  const nextY = nextCenterPoint.y - height / 2;
  return {
    x: nextX,
    y: nextY,
    width,
    height,
  };
}

export function extendsValue(key: string, value: any, defalultValue: any): void {
  this[`_${key}`] = isUndefined(value) ? defalultValue : value;
}
