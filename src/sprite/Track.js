import Sprite from "./Sprite";

const TRACK_NODES = {
  LEFT_TOP: 0,
  CENTER_TOP: 1,
  RIGHT_TOP: 2,
  RIGHT_CENTER: 3,
  RIGHT_BOTTOM: 4,
  CETNER_BOTTOM: 5,
  LEFT_BOTTOM: 6,
  LEFT_CETNER: 7,
  SELF: 8,
  ROTATE: 9,
  NONE: -1,
};

class Track extends Sprite {

  constructor(props = {}) {
    super(props);
    this._supportNodes = this.computedValue('_supportNodes', props.supportNodes, [0, 2, 4, 6, 8, -1]);
    this._lineColor = this.computedValue('_lineColor', props.lineColor, '#08b9ff');
    this._nodeColor = this.computedValue('_nodeColor', props.nodeColor, '#adadad');
    this._nodeRadius = this.computedValue('_nodeRadius', props.nodeRadius, 4);
  }

  renderCache() {

    
  }
}

export default Track;