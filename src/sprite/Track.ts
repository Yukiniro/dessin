import constant from '../constant/constant';
import { Pos, Rect, Size, TrackJSON, TrackNodes } from '../types/types';
import {
  angleToRadian,
  calcRectWithAngle,
  extendsValue,
  calcPointWithAngle,
  isPointInRect,
  calcPointInRect,
} from '../util/util';

const TRACK_NODES = {
  LEFT_TOP: 0,
  CENTER_TOP: 1,
  RIGHT_TOP: 2,
  RIGHT_CENTER: 3,
  RIGHT_BOTTOM: 4,
  CENTER_BOTTOM: 5,
  LEFT_BOTTOM: 6,
  LEFT_CETNER: 7,
  SELF: 8,
  ROTATE: 9,
  NONE: -1,
};

interface TrackWithOnwer extends TrackJSON {
  owner: any;
}

class Track {
  protected _supportNodes: Array<number>;
  protected _lineColor: string;
  protected _nodeColor: string;
  protected _nodeRadius: number;
  protected _rotateNodeOffset: number;
  protected _cacheView: HTMLCanvasElement;
  protected _cacheCtx: CanvasRenderingContext2D;
  protected _owner: any;

  constructor(props: TrackWithOnwer = { owner: null }) {
    extendsValue.call(this, 'supportNodes', props.supportNodes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1]);
    extendsValue.call(this, 'lineColor', props.lineColor, '#08b9ff');
    extendsValue.call(this, 'nodeColor', props.nodeColor, '#adadad');
    extendsValue.call(this, 'nodeRadius', props.nodeRadius, 4);
    this._rotateNodeOffset = 10;
    this._cacheView = document.createElement('canvas');
    this._cacheCtx = this._cacheView.getContext('2d');
    this._owner = props.owner;
  }

  /**
   * @description 返回track节点类型
   * @returns
   */
  static TRACK_NODES(): TrackNodes {
    return TRACK_NODES;
  }

  /**
   * @description 返回其拥有者
   */
  get owner(): any {
    return this._owner;
  }

  /**
   * @description 返回位置
   */
  get pos(): Pos {
    return this._owner.getPos();
  }

  /**
   * @description 返回尺寸
   */
  get size(): Size {
    return this._owner.getSize();
  }

  /**
   * @description 返回旋转角度
   */
  get angle(): number {
    return this._owner.getAngle();
  }

  /**
   * @description 返回位置尺寸信息
   */
  get rect(): Rect {
    return this._owner.rect;
  }

  /**
   * @description 渲染控制器
   * @param {context} ctx
   */
  render(ctx: CanvasRenderingContext2D): void {
    const { x, y, width, height } = this.rect;
    const angle = this.angle;
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(angleToRadian(angle));
    this._renderNodes(ctx);
    this._renderLines(ctx);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
  }

  /**
   * @description 计算指定point在控制器中的节点类型
   * @param {obeject} point
   * @param {number} point.x
   * @param {number} point.y
   * @returns
   */
  clacTrackNodeWithPoint(point: Pos): number {
    const pointWithAngle = calcPointWithAngle(point, this.angle);
    const rectWithAngle = calcRectWithAngle(this.rect, this.angle);
    const nodeRadius = this._nodeRadius;
    const findIndex = this._supportNodes.findIndex((node) => {
      const { x, y } = this._calcNodePos(node, true);
      const nodeRect = {
        x: x - nodeRadius,
        y: y - nodeRadius,
        width: nodeRadius * 2,
        height: nodeRadius * 2,
      };

      return isPointInRect(pointWithAngle, nodeRect);
    });

    if (findIndex === -1) {
      if (isPointInRect(pointWithAngle, rectWithAngle)) {
        return TRACK_NODES.SELF;
      } else {
        return TRACK_NODES.NONE;
      }
    } else {
      return this._supportNodes[findIndex];
    }
  }

  /**
   * @description 計算指定节点类型的位置信息
   * @param {number} node
   * @param {boolean} useAngle
   * @returns
   */
  _calcNodePos(node: number, useAngle?: boolean): Pos {
    const rect = useAngle ? calcRectWithAngle(this.rect, this.angle) : this.rect;
    let pos = { x: 0, y: 0 } as Pos;
    switch (node) {
      case 0:
        pos = calcPointInRect(constant.LEFT_TOP, rect);
        break;
      case 1:
        pos = calcPointInRect(constant.CENTER_TOP, rect);
        break;
      case 2:
        pos = calcPointInRect(constant.RIGHT_TOP, rect);
        break;
      case 3:
        pos = calcPointInRect(constant.RIGHT_CENTER, rect);
        break;
      case 4:
        pos = calcPointInRect(constant.RIGHT_BOTTOM, rect);
        break;
      case 5:
        pos = calcPointInRect(constant.CENTER_BOTTOM, rect);
        break;
      case 6:
        pos = calcPointInRect(constant.LEFT_BOTTOM, rect);
        break;
      case 7:
        pos = calcPointInRect(constant.LEFT_CENTER, rect);
        break;
      case 9: {
        const { x, y } = calcPointInRect(constant.CENTER_TOP, rect);
        pos = {
          x,
          y: y - this._rotateNodeOffset,
        };
        break;
      }
      default:
    }

    return pos;
  }

  /**
   * @description 渲染所有控制点
   * @param {*} ctx
   */
  _renderNodes(ctx: CanvasRenderingContext2D): void {
    this._supportNodes.forEach((node) => {
      const pos = this._calcNodePos(node);
      const { x, y, width, height } = this.rect;
      pos.x -= x + width / 2;
      pos.y -= y + height / 2;
      this._renderNode(ctx, pos);
    });
  }

  /**
   * @description 渲染控制点
   * @param {*} ctx
   * @param {object} point
   * @param {number} point.x
   * @param {number} point.y
   */
  _renderNode(ctx: CanvasRenderingContext2D, point: Pos): void {
    ctx.save();
    ctx.fillStyle = this._nodeColor;
    ctx.beginPath();
    ctx.arc(point.x, point.y, this._nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /**
   * @description
   * @param {HTMLCanvasContext} ctx
   */
  _renderLines(ctx: CanvasRenderingContext2D): void {
    const { x, y, width, height } = this.rect;
    const pointLeftTop = this._calcNodePos(TRACK_NODES.LEFT_TOP);
    const pointRightTop = this._calcNodePos(TRACK_NODES.RIGHT_TOP);
    const pointLeftBottom = this._calcNodePos(TRACK_NODES.LEFT_BOTTOM);
    const pointRightBottom = this._calcNodePos(TRACK_NODES.RIGHT_BOTTOM);
    pointLeftTop.x -= x + width / 2;
    pointLeftTop.y -= y + height / 2;
    pointRightTop.x -= x + width / 2;
    pointRightTop.y -= y + height / 2;
    pointLeftBottom.x -= x + width / 2;
    pointLeftBottom.y -= y + height / 2;
    pointRightBottom.x -= x + width / 2;
    pointRightBottom.y -= y + height / 2;
    this._renderLine(ctx, pointLeftTop, pointRightTop);
    this._renderLine(ctx, pointRightTop, pointRightBottom);
    this._renderLine(ctx, pointRightBottom, pointLeftBottom);
    this._renderLine(ctx, pointLeftBottom, pointLeftTop);
  }

  /**
   * @description 在指定ctx上绘制pointFrom、pointTo之间的线条
   * @param {*} ctx
   * @param {object} pointFrom
   * @param {number} pointFrom.x
   * @param {number} pointFrom.y
   * @param {object} pointTo
   * @param {number} pointTo.x
   * @param {number} pointTo.y
   */
  _renderLine(ctx: CanvasRenderingContext2D, pointFrom: Pos, pointTo: Pos): void {
    ctx.save();
    ctx.strokeStyle = this._lineColor;
    ctx.beginPath();
    ctx.moveTo(pointFrom.x, pointFrom.y);
    ctx.lineTo(pointTo.x, pointTo.y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

export default Track;
