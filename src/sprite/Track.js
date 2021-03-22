import constant from "../constant/constant";
import util from "../util/util";

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
    this._supportNodes = this.computedValue('_supportNodes', props.supportNodes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1]);
    this._lineColor = this.computedValue('_lineColor', props.lineColor, '#08b9ff');
    this._nodeColor = this.computedValue('_nodeColor', props.nodeColor, '#adadad');
    this._nodeRadius = this.computedValue('_nodeRadius', props.nodeRadius, 4);
    this._rotateNodeOffset = 10;
    this._cacheView = document.createElement('canvas');
    this._cacheCtx = this._cacheView.getContext('2d');
  }

  static TRACK_NODES() {
    return TRACK_NODES;
  }

  computedValue(key, value, defalultValue) {
    const {isUndefined} = util;
    return isUndefined(value) ? defalultValue : value;
  }

  renderCache(width, height) {
    this._cacheView.width = width;
    this._cacheView.height = height;
    this._cacheCtx.save();
    this._cacheCtx.strokeStyle = this._lineColor;
    this._cacheCtx.strokeRect(this._nodeRadius, this._nodeRadius, width - this._nodeRadius * 2, height - this._nodeRadius * 2);
    this._cacheCtx.restore();
    this._renderNodes(width, height);
  }

  render(ctx, x, y, width, height) {
    let rect = {
      x: x - this._nodeRadius,
      y: y - this._nodeRadius,
      width: width + this._nodeRadius * 2,
      height: height + this._nodeRadius * 2,
    };
    this.renderCache(width, height);
    ctx.drawImage(this._cacheView, rect.x, rect.y, rect.width, rect.height);
  }

  _renderNodes(width, height) {
    this._supportNodes.forEach(node => {
      let point = { x: 0, y: 0 };
      let rect = {
        x: this._nodeRadius, 
        y: this._nodeRadius, 
        width: width - this._nodeRadius * 2,
        height: height - this._nodeRadius * 2,
      };
      switch (node) {
        case 0:
          point = util.calePointInRect(constant.LEFT_TOP, rect);
          break;
        case 1:
          point = util.calePointInRect(constant.CENTER_TOP, rect);
          break;
        case 2:
          point = util.calePointInRect(constant.RIGHT_TOP, rect);
          break;
        case 3:
          point = util.calePointInRect(constant.RIGHT_CENTER, rect);         
          break;
        case 4:
          point = util.calePointInRect(constant.RIGHT_BOTTOM, rect);          
          break;
        case 5:
          point = util.calePointInRect(constant.CENTER_BOTTOM, rect);          
          break;
        case 6:
          point = util.calePointInRect(constant.LEFT_BOTTOM, rect);          
          break;
        case 7:
          point = util.calePointInRect(constant.LEFT_CENTER, rect);          
          break;
        case 9:
          point = { x: width / 2, y: this._nodeRadius - this._rotateNodeOffset };
          break;
        default:
      }
      this._renderNode(point);
    });
  }

  _renderNode(point) {
    this._cacheCtx.save();
    this._cacheCtx.fillStyle = this._nodeColor;
    this._cacheCtx.beginPath();
    this._cacheCtx.arc(point.x, point.y, this._nodeRadius, 0, Math.PI * 2);
    this._cacheCtx.fill();
    this._cacheCtx.restore();
  }
}

export default Track;