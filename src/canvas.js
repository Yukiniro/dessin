import util from './util/util';
import collection from './mixin/collection.mixin';
import observable from './mixin/observable.mixin';
import track from './sprite/track';

class Canvas {
  constructor(props = {}) {
    this._lowerCanvas = props && props.canvas; // 渲染视图
    this._upperCanvas = document.createElement('canvas'); // 事件响应、辅助线视图
    this._size = { width: 500, height: 500 };
    this._viewResponse = 1; // 实际渲染与最终成像之间的比例关系
    this._body = document.body;
    this._willOperateSprite = null; // 将要正在控制的对象
    this._hasMousedown = false; // 鼠标是否已经按下，区分划过、拖动
    this._recordSprite = null; // 当前正在控制的对象
    this._recordPoint = null;
    this._recordTrackNode = track.TRACK_NODES().NONE;
    this._recordSpriteData = null;
    this._viewRect = null;
    this._fireEvent = this._fireEvent.bind(this);

    this._initView();
    this._bindEvent();
    this._updateView();
  }

  /**
   * @description 初始化视图
   */
  _initView() {
    if (!this._lowerCanvas) {
      throw new Error('You have to bind a canvas!');
    } else {
      let parent = this._lowerCanvas.parentNode;
      let parentPositionStyle = parent.style.position;
      parent.insertBefore(this._upperCanvas, this._lowerCanvas.nextSibling);
      if (!parentPositionStyle || parentPositionStyle === 'static') {
        util.css(parent, { position: 'relative' });
      }
      util.css(this._lowerCanvas, {
        position: 'absolute',
      });
      util.css(this._upperCanvas, {
        position: 'absolute',
        'pointer-events': 'none',
      });
    }
  }

  _bindEvent() {
    this._lowerCanvas.addEventListener('mousedown', this._fireEvent);
    this._lowerCanvas.addEventListener('clcik', this._fireEvent);
    this._lowerCanvas.addEventListener('dblclick', this._fireEvent);
    this._lowerCanvas.addEventListener('mousemove', this._fireEvent);
  }

  _unbindEvent() {
    this._lowerCanvas.removeEventListener('mousedown', this._fireEvent);
    this._lowerCanvas.removeEventListener('clcik', this._fireEvent);
    this._lowerCanvas.removeEventListener('dblclick', this._fireEvent);
    this._lowerCanvas.removeEventListener('mouseover', this._fireEvent);
  }

  _bindEventForBody() {
    this._body.addEventListener('mousemove', this._fireEvent);
    this._body.addEventListener('mouseup', this._fireEvent);
  }

  _unbindEventForBody() {
    this._body.removeEventListener('mousemove', this._fireEvent);
    this._body.removeEventListener('mouseup', this._fireEvent);
  }

  /**
   * @description 触发鼠标事件
   * @param {*} mouseEvent
   */
  _fireEvent(mouseEvent) {
    const cursorPoint = util.calcCursorPoint(mouseEvent);
    const offsetCursorPoint = {
      x: cursorPoint.x - this._viewRect.x,
      y: cursorPoint.y - this._viewRect.y,
    };
    switch (mouseEvent.type) {
      case 'mousedown':
        this._recordPoint = offsetCursorPoint;
        this._unbindEvent();
        this._bindEventForBody();
        this._recordSprite = this._getTopSprite(this._recordPoint);
        this._hasMousedown = true;
        if (this._recordSprite) {
          this._recordTrackNode = this._recordSprite.calcTrackNode(
            this._recordPoint
          );
          this._recordSpriteData = this._recordSprite.encode();
          this.selectSprite(this._recordSprite);
        }
        break;
      case 'click':
        break;
      case 'dblclick':
        break;
      case 'mousemove': {
        
        if (this._recordSprite) {
          const vercotr = util.calcVertor(this._recordPoint, offsetCursorPoint);
          this._recordSprite.transform(
            this._recordTrackNode,
            vercotr,
            this._recordSpriteData
          );
          this.render();
        } else {
          const hoverSprite = this._getTopSprite(offsetCursorPoint);
          if (hoverSprite) {
            const hoverTrackNode = hoverSprite.calcTrackNode(offsetCursorPoint);
          }
        }
        break;
      }
      case 'mouseup':
        this._bindEvent();
        this._unbindEventForBody();
        this._hasMousedown = false;
        this._recordSprite = null;
        this._recordPoint = null;
        this._hasMousedown = false;
        break;
      default:
    }

    this.renderTrack();
  }

  /**
   * @description 选中指定id的对象并反选其他对象
   * @param {*} id
   */
  selectSprite(id) {
    if (!id) return this.deselectAll();
    this.forEachItem((item) => {
      if (item.id === id) {
        if (!item.isSelect()) item.select();
      } else {
        if (item.isSelected()) item.deselect();
      }
    });

    return this;
  }

  /**
   * @description 返回其他所有对象
   */
  deselectAll() {
    this.forEachItem((item) => {
      if (item.isSelect()) item.deselect();
    });

    return this;
  }

  /**
   * @description 获取最顶层的对象
   * @returns {sprite}
   */
  _getTopSprite(point) {
    let top = null;
    let allItems = this.all();
    for (let i = 0; i < this.size(); i++) {
      const curItem = allItems[i];
      if (curItem && curItem.isPointInSelf(point)) {
        top = curItem;
        break;
      }
    }

    return top;
  }

  /**
   * @description 更新视图尺寸
   */
  _updateView() {
    let { width, height } = this._size;
    this._lowerCanvas.width = width;
    this._lowerCanvas.height = height;
    this._upperCanvas.width = width;
    this._upperCanvas.height = height;
    this._updateViewRect();
    this.render();
    this.renderTrack();
  }

  /**
   * @description 更新视图相对于浏览器的位置尺寸信息
   */
  _updateViewRect() {
    const viewRect = this._upperCanvas.getBoundingClientRect();
    this._viewRect = {
      x: viewRect.left,
      y: viewRect.top,
      width: viewRect.width,
      height: viewRect.height,
    };
  }

  /**
   * @description 清空画布
   */
  _clear() {
    let { width, height } = this.getSize();
    this._lowerCanvas.getContext('2d').clearRect(0, 0, width, height);
  }

  /**
   * @description 清楚主视图画布
   */
  clearLowerCanvas() {
    util.clearCanvas(this._lowerCanvas);
  }

  /**
   * @description 清楚控制器画布
   */
  clearUpperCanvas() {
    util.clearCanvas(this._upperCanvas);
  }

  /**
   * @description 渲染
   */
  render() {
    this.clearLowerCanvas();
    this.forEachItem((sprite) => {
      sprite.render(this._lowerCanvas.getContext('2d'));
    });

    this.renderTrack();
  }

  /**
   * @description 渲染控制器
   */
  renderTrack() {
    this.clearUpperCanvas();
    this.forEachItem((sprite) => {
      sprite.renderTrack(this._upperCanvas.getContext('2d'));
    });
  }

  /**
   * @description 返回返回尺寸
   * @returns {object} size
   * @returns {number} size.widht
   * @returns {number} size.height
   */
  getSize() {
    return this._size;
  }

  /**
   * @description 设置视图尺寸
   * @param {object} size
   * @param {number} size.width
   * @param {number} size.height
   * @returns
   */
  setSize(size) {
    this._size = { ...size };
    this._updateView();
    return this;
  }
}

util.mixin(Canvas.prototype, collection);
util.mixin(Canvas.prototype, observable);

export default Canvas;
