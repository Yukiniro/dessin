import constant from '../constant/constant';
import { Pos, Rect, Size, TrackNodes, TrackWithOnwer } from '../types/types';
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

class Track {
  protected _supportNodes: Array<number>;
  protected _lineColor: string;
  protected _nodeColor: string;
  protected _nodeHoverColor: string;
  protected _nodeBorderColor: string;
  protected _nodeRadius: number;
  protected _rotateNodeOffset: number;
  protected _cacheView: HTMLCanvasElement;
  protected _cacheViewForTrackNode: HTMLCanvasElement;
  protected _cacheViewForTrackNodeHover: HTMLCanvasElement;
  protected _cacheCtx: CanvasRenderingContext2D;
  protected _owner: any;

  constructor(props: TrackWithOnwer = { owner: null }) {
    extendsValue.call(this, 'supportNodes', props.supportNodes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1]);
    extendsValue.call(this, 'lineColor', props.lineColor, '#08b9ff');
    extendsValue.call(this, 'nodeColor', props.nodeColor, '#FFFFFF');
    extendsValue.call(this, 'nodeHoverColor', props.nodeHoverColor, '#08b9ff');
    extendsValue.call(this, 'nodeBorderColor', props.nodeBorderColor, '#A8A8A8');
    extendsValue.call(this, 'nodeRadius', props.nodeRadius, 6);
    this._rotateNodeOffset = 20;
    this._cacheView = document.createElement('canvas');
    this._cacheCtx = this._cacheView.getContext('2d');
    this._cacheViewForTrackNode = document.createElement('canvas');
    this._cacheViewForTrackNodeHover = document.createElement('canvas');
    this._owner = props.owner;

    this._initNodeView();
  }

  /**
   * @desc Return all nodes of the track.
   */
  static TRACK_NODES(): TrackNodes {
    return TRACK_NODES;
  }

  /**
   * @type Return the owner.
   */
  get owner(): any {
    return this._owner;
  }

  /**
   * @type Return ths position of the track
   */
  get pos(): Pos {
    return this._owner.getPos();
  }

  /**
   * @type Return ths size of the track
   */
  get size(): Size {
    return this._owner.getSize();
  }

  /**
   * @type Return ths angle of the track
   */
  get angle(): number {
    return this._owner.getAngle();
  }

  /**
   * @type {Object}
   * @property {number} x
   * @property {number} y
   * @property {number} width
   * @property {number} height
   */
  get rect(): Rect {
    return this._owner.rect;
  }

  private _initNodeView() {
    const width = this._nodeRadius * 2;
    const height = this._nodeRadius * 2;
    this._cacheViewForTrackNode.width = width;
    this._cacheViewForTrackNode.height = height;
    this._cacheViewForTrackNodeHover.width = width;
    this._cacheViewForTrackNodeHover.height = height;
    const ctx = this._cacheViewForTrackNode.getContext('2d');
    ctx.fillStyle = this._nodeBorderColor;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, this._nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = this._nodeColor;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, this._nodeRadius - 1, 0, Math.PI * 2);
    ctx.fill();
    const ctxHover = this._cacheViewForTrackNodeHover.getContext('2d');
    ctxHover.fillStyle = this._nodeHoverColor;
    ctxHover.beginPath();
    ctxHover.arc(width / 2, height / 2, this._nodeRadius, 0, Math.PI * 2);
    ctxHover.fill();
  }

  render(ctx: CanvasRenderingContext2D, isHover?: boolean, activeTrackNode?: number): void {
    const { x, y, width, height } = this.rect;
    const angle = this.angle;
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(angleToRadian(angle));
    this._renderLines(ctx);
    if (!isHover) {
      this._renderNodes(ctx, activeTrackNode);
    }
    ctx.restore();
  }

  /**
   * @desc
   * @param {obeject} point
   * @property {number} point.x
   * @property {number} point.y
   * @return {number}
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
   * @desc
   * @param {number} node
   * @param {boolean} [useAngle]
   * @return {Object}
   * @property {number} x
   * @property {number} y
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
      case 8:
        pos = calcPointInRect(constant.CENTER, rect);
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
   * @desc Render all controller node
   */
  _renderNodes(ctx: CanvasRenderingContext2D, activeTrackNode?: number): void {
    this._supportNodes.forEach((node) => {
      if (node !== TRACK_NODES.SELF && node !== TRACK_NODES.NONE) {
        const pos = this._calcNodePos(node);
        const { x, y, width, height } = this.rect;
        this._renderNode(
          ctx,
          {
            x: pos.x - x - width / 2,
            y: pos.y - y - height / 2,
          },
          node === activeTrackNode
        );
      }
    });
  }

  /**
   * @desc Render controller node
   * @param {*} ctx
   * @param {Object} point
   * @property {number} point.x
   * @property {number} point.y
   * @property {boolean} isHover
   */
  _renderNode(ctx: CanvasRenderingContext2D, point: Pos, isHover: boolean): void {
    ctx.save();
    ctx.drawImage(
      isHover ? this._cacheViewForTrackNodeHover : this._cacheViewForTrackNode,
      point.x - this._nodeRadius,
      point.y - this._nodeRadius
    );
    ctx.restore();
  }

  /**
   * @desc
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
   * @desc
   * @param {*} ctx
   * @param {Object} pointFrom
   * @param {number} pointFrom.x
   * @param {number} pointFrom.y
   * @param {Object} pointTo
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
