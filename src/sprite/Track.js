import constant from '../constant/constant';
import eventConstant from '../constant/event-constant';
import util from '../util/util';

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
  constructor(props = {}) {
    this._supportNodes = this.extendsValue(
      props.supportNodes,
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1]
    );
    this._lineColor = this.extendsValue(props.lineColor, '#08b9ff');
    this._nodeColor = this.extendsValue(props.nodeColor, '#adadad');
    this._nodeRadius = this.extendsValue(props.nodeRadius, 4);
    this._rotateNodeOffset = 10;
    this._cacheView = document.createElement('canvas');
    this._cacheCtx = this._cacheView.getContext('2d');
    this._owner = props.owner;
  }

  /**
   * @description 返回track节点类型
   * @returns 
   */
  static TRACK_NODES() {
    return TRACK_NODES;
  }

  /**
   * @description 返回其拥有者
   */
  get owner() {
    return this._owner;
  }

  /**
   * @description 返回位置
   */
  get pos() {
    return this._owner.getPos();
  }

  /**
   * @description 返回尺寸
   */
  get size() {
    return this._owner.getSize();
  }

  /**
   * @description 返回旋转角度
   */
  get angle() {
    return this._owner.getAngle();
  }

  /**
   * @description 返回位置尺寸信息
   */
  get rect() {
    return {
      ...this.pos,
      ...this.size,
    }
  }

  extendsValue(value, defalultValue) {
    return util.isUndefined(value) ? defalultValue : value;
  }

  /**
   * @description 渲染控制器
   * @param {context} ctx
   */
  render(ctx) {
    const {x, y, width, height} = this.rect;
    const angle = this.angle;
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(util.angleToRadian(angle));
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
  clacTrackNodeWithPoint(point) {
    const nodeRadius = this._nodeRadius;
    let findIndex = this._supportNodes.findIndex(node => {
      const {x, y} = this._calcNodePos(node);
      const nodeRect = {
        x: x - nodeRadius,
        y: y - nodeRadius,
        width: nodeRadius * 2,
        height: nodeRadius * 2,
      };

      return util.isPointInRect(point, nodeRect);
    });

    if (findIndex === -1) {
      if (util.isPointInRect(point, this.rect)) {
        return TRACK_NODES.SELF;
      } else {
        return TRACK_NODES.NONE;
      }
    } else {
      return this._supportNodes[findIndex];
    }
  }

  /**
   * @description 計算
   * @param {number} node 
   * @returns 
   */
  _calcNodePos(node) {
    const rect = this.rect;
    let pos = {x: 0, y: 0};
    switch (node) {
      case 0:
        pos = util.calePointInRect(constant.LEFT_TOP, rect);
        break;
      case 1:
        pos = util.calePointInRect(constant.CENTER_TOP, rect);
        break;
      case 2:
        pos = util.calePointInRect(constant.RIGHT_TOP, rect);
        break;
      case 3:
        pos = util.calePointInRect(constant.RIGHT_CENTER, rect);
        break;
      case 4:
        pos = util.calePointInRect(constant.RIGHT_BOTTOM, rect);
        break;
      case 5:
        pos = util.calePointInRect(constant.CENTER_BOTTOM, rect);
        break;
      case 6:
        pos = util.calePointInRect(constant.LEFT_BOTTOM, rect);
        break;
      case 7:
        pos = util.calePointInRect(constant.LEFT_CENTER, rect);
        break;
      case 9: {
        const {x, y} = util.calePointInRect(constant.CENTER_TOP, rect);;
        pos = {
          x,
          y: y - this._rotateNodeOffset,
        };
        break;
      }
      default:
        throw new Error(constant.ARGUMENT_ERROR);
    }

    return pos;
  }

  /**
   * @description 渲染所有控制点
  * @param {*} ctx
   */
  _renderNodes(ctx) {
    this._supportNodes.forEach(node => {
      const pos = this._calcNodePos(node);
      const {x, y, width, height} = this.rect;
      pos.x -= (x + width / 2);
      pos.y -= (y + height / 2);
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
  _renderNode(ctx, point) {
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
  _renderLines(ctx) {
    const {x, y, width, height} = this.rect;
    const pointLeftTop = this._calcNodePos(TRACK_NODES.LEFT_TOP);
    const pointRightTop = this._calcNodePos(TRACK_NODES.RIGHT_TOP);
    const pointLeftBottom = this._calcNodePos(TRACK_NODES.LEFT_BOTTOM);
    const pointRightBottom = this._calcNodePos(TRACK_NODES.RIGHT_BOTTOM);
    pointLeftTop.x -= (x + width / 2);
    pointLeftTop.y -= (y + height / 2);
    pointRightTop.x -= (x + width / 2);
    pointRightTop.y -= (y + height / 2);
    pointLeftBottom.x -= (x + width / 2);
    pointLeftBottom.y -= (y + height / 2);
    pointRightBottom.x -= (x + width / 2);
    pointRightBottom.y -= (y + height / 2);
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
  _renderLine(ctx, pointFrom, pointTo) {
    ctx.save();
    ctx.lineColor = this._lineColor;
    ctx.beginPath();
    ctx.moveTo(pointFrom.x, pointFrom.y);
    ctx.lineTo(pointTo.x, pointTo.y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

export default Track;
