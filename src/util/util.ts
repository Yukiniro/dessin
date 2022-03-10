import constant from '../constant/constant';
import { Font, Pos, Rect } from '../types/types';
import { detectorOBBvsOBB, OBB, Vector2 } from './obb';

const { hasOwnProperty } = Object.prototype;

/**
 * @desc Check whether the value is undefined
 * @param value
 * @return {boolean}
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
      const result: { [key: string]: any } = {};
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

export function css(element: HTMLElement, style: { [key: string]: any }): void {
  for (let key in style) {
    if (hasOwnProperty.call(style, key)) {
      element.style[key as unknown as number] = style[key];
    }
  }
}

/**
 * @desc
 */
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
 * @param {Object} rect
 * @param {number} rect.x
 * @param {number} rect.y
 * @param {number} rect.width
 * @param {number} rect.height
 * @return {Object}
 * @property {number} x
 * @property {number} y
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

/**
 * @desc Calculate the position of the diagonal of the points
 * @param {number} type
 * @param {Object} rect
 * @property {number} rect.x
 * @property {number} rect.y
 * @property {number} rect.width
 * @property {number} rect.height
 * @return {Object}
 * @property {number} x
 * @property {number} y
 */
export function calcDiagonalInRect(type: number, rect: Rect): Pos {
  let point = { x: 0, y: 0 } as Pos;
  switch (type) {
    case constant.LEFT_TOP:
      point = calcPointInRect(constant.RIGHT_BOTTOM, rect);
      break;
    case constant.CENTER_TOP:
      point = calcPointInRect(constant.CENTER_BOTTOM, rect);
      break;
    case constant.RIGHT_TOP:
      point = calcPointInRect(constant.LEFT_BOTTOM, rect);
      break;
    case constant.RIGHT_CENTER:
      point = calcPointInRect(constant.LEFT_CENTER, rect);
      break;
    case constant.RIGHT_BOTTOM:
      point = calcPointInRect(constant.LEFT_TOP, rect);
      break;
    case constant.CENTER_BOTTOM:
      point = calcPointInRect(constant.CENTER_TOP, rect);
      break;
    case constant.LEFT_BOTTOM:
      point = calcPointInRect(constant.RIGHT_TOP, rect);
      break;
    case constant.LEFT_CENTER:
      point = calcPointInRect(constant.RIGHT_CENTER, rect);
      break;
    default:
      point = calcPointInRect(type, rect);
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
 * @desc Calculate the distance between two points
 * @param {Object} point1
 * @property {number} point1.x
 * @property {number} point1.y
 * @param {Object} point2
 * @property {number} point2.x
 * @property {number} point2.y
 * @return {number}
 */
export function calcDistance(point1: Pos, point2: Pos): number {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  const offsetX = Math.abs(x2 - x1);
  const offsetY = Math.abs(y2 - y1);
  return Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
}

/**
 * @desc Calculate the rect between two points
 * @param {Object} point1
 * @property {number} point1.x
 * @property {number} point1.y
 * @param {Object} point2
 * @property {number} point2.x
 * @property {number} point2.y
 * @return {Rect | null}
 */
export function calcRectForFrame(point1: Pos, point2: Pos): Rect | null {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  if (x1 === x2 || y1 === y2) {
    return null;
  }
  return {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x1 - x2),
    height: Math.abs(y1 - y2),
  };
}

/**
 * @desc Take the vector point2 with respect to point1
 * @param {Object} point1
 * @property {number} point1.x
 * @property {number} point1.y
 * @param {Object} point2
 * @property {number} point2.x
 * @property {number} point2.y
 * @return {Object}
 * @property {Object} x
 * @property {Object} y
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

export function angleToRadian(angle: number): number {
  return (angle / 180) * Math.PI;
}

export function radianToAngle(radian: number): number {
  return (radian / Math.PI) * 180;
}

export function toFixed(value: number, digits: number): number {
  return Number(Number(value).toFixed(digits));
}

/**
 * @desc Limit the Angle value between 0 and 360
 * @param {number} angle
 * @return {number}
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
 * @desc Adsorption Angle
 * @param {number} angle
 * @param {number} [offset=6]
 * @return {number}
 */
export function adsorbAngle(angle: number, offset = 6): number {
  const angleToAbsorb = [0, 90, 180, 270, 360];
  const ang = fixAngle(angle);
  const index = angleToAbsorb.findIndex((value) => Math.abs(value - ang) <= offset);
  return index === -1 ? ang : angleToAbsorb[index];
}

/**
 * @desc Calculates the new coordinates of point after Angle is rotated in the Canvas coordinate system
 * @param {Object} point
 * @property {number} point.x
 * @property {number} point.y
 * @param {number} angle
 * @return {Object}
 * @property {number} x
 * @property {number} y
 */
export function calcPointWithAngle(point: Pos, angle: number): Pos {
  return calcPointToPointWithAngle(point, {x: 0, y: 0}, angle);
}

export function calcPointToPointWithAngle(point1: Pos, point2: Pos, angle: number) {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  const radian = angleToRadian(-angle);
  const nextX = (x1 - x2) * Math.cos(radian) - (y1 - y2) * Math.sin(radian) + x2;
  const nextY = (x1 - x2) * Math.sin(radian) + (y1 - y2) * Math.cos(radian) + y2;
  return {
    x: nextX,
    y: nextY,
  };
}

/**
 * @desc Calculates the new rect of rect after rotation Angle in canvas coordinate system
 * @param {Object} rect
 * @property {number} rect.x
 * @property {number} rect.y
 * @property {number} rect.width
 * @property {number} rect.height
 * @param {number} angle
 * @return {Object}
 * @return {Object}
 * @return {Object}
 * @return {Object}
 */
export function calcRectWithAngle(rect: Rect, angle: number): Rect {
  const { width, height } = rect;
  const centerPoint = calcPointInRect(constant.CENTER, rect);
  const nextCenterPoint = calcPointWithAngle(centerPoint, angle);
  const nextX = nextCenterPoint.x - width / 2;
  const nextY = nextCenterPoint.y - height / 2;
  return {
    x: nextX,
    y: nextY,
    width,
    height,
  };
}

/**
 * @description Extends the value for this.
 * @param key
 * @param value
 * @param defalultValue
 */
export function extendsValue(key: string, value: any, defalultValue: any): void {
  this[`_${key}`] = isUndefined(value) ? defalultValue : value;
}

/**
 * @desc Return whether rect1(angle1) and rect2(angle2) collide
 * @param rect1
 * @param angle1
 * @param rect2
 * @param angle2
 */
export function isCollision(rect1: Rect, angle1: number, rect2: Rect, angle2: number): boolean {
  const centerPoint1 = calcPointInRect(constant.CENTER, rect1);
  const obb1 = new OBB(
    new Vector2(centerPoint1.x, centerPoint1.y),
    rect1.width,
    rect1.height,
    angle1
  );
  const centerPoint2 = calcPointInRect(constant.CENTER, rect2);
  const obb2 = new OBB(
    new Vector2(centerPoint2.x, centerPoint2.y),
    rect2.width,
    rect2.height,
    angle2
  );
  return detectorOBBvsOBB(obb1, obb2);
}

/**
 * @desc Return Returns the largest rect that wraps the specified rect in the current coordinate system
 * @param rect
 * @param angle
 * @returns
 */
export function wrapRectWithAngle(rect: Rect, angle: number): Rect {
  const centerPoint = calcPointInRect(constant.CENTER, rect);
  const points = [
    constant.LEFT_TOP,
    constant.RIGHT_TOP,
    constant.RIGHT_BOTTOM,
    constant.LEFT_BOTTOM,
  ].map((value) => calcPointToPointWithAngle(calcPointInRect(value, rect), centerPoint, angle));
  return _getMaxRectForPoints(points);
}

export function wrapRects(rects: Array<Rect>): Rect {
  const points: Array<Pos> = [];
  rects.forEach((rect) => {
    const curPoints = [constant.LEFT_TOP, constant.RIGHT_BOTTOM].map((value) =>
      calcPointInRect(value, rect)
    );
    points.push(...curPoints);
  });
  return _getMaxRectForPoints(points);
}

function _getMaxRectForPoints(points: Array<Pos>): Rect {
  const minX = Math.min(...points.map((point) => point.x));
  const maxX = Math.max(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxY = Math.max(...points.map((point) => point.y));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
