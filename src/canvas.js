import util from './util/util'
import collection from './mixin/collection.mixin'
import observable from './mixin/observable.mixin'
import event from './event'

class Canvas {

  constructor(props = {}) {
    this._lowerCanvas = props && props.canvas; // 渲染视图
    this._upperCanvas = document.createElement('canvas'); // 事件响应、辅助线视图
    this._size = {width: 500, height: 500};
    this._viewResponse = 1; // 实际渲染与最终成像之间的比例关系

    this._initView();
    this._updateView();
  }

  _initView() {
    let parent = this._lowerCanvas.parentNode;
    let parentPositionStyle = parent.style.position;
    parent.insertBefore(this._upperCanvas, this._lowerCanvas.nextSibling);
    if (!parentPositionStyle || parentPositionStyle === 'static') {
      util.css(parent, {position: 'relative'});
    }
    util.css(this._lowerCanvas, {
      position: 'absolute',
    });
    util.css(this._upperCanvas, {
      position: 'absolute',
    });
    event.bindView(this, this._upperCanvas);
  }

  _updateView() {
    let {width, height} = this._size;
    this._lowerCanvas.width = width;
    this._lowerCanvas.height = height;
    this._upperCanvas.width = width;
    this._upperCanvas.height = height;

    this.render();
  }

  _clear() {
    let {width, height} = this.getSize();
    this._lowerCanvas.getContext('2d').clearRect(0, 0, width, height);
  }

  render() {

  }

  getSize() {
    return this._size;
  }

  setSize(size) {
    this._size = {...size};
    this._updateView();
    return this;
  }

  fireEvent(type, e) {
    
  }
}

util.mixin(Canvas.prototype, collection);
util.mixin(Canvas.prototype, observable);

export default Canvas;