import { css, calcCursorPoint, calcVertor, clearCanvas } from '../util/util';
import Track from './Track';
import { Pos, Rect, Size } from '../types/types';
import CollectionMixin from '../mixin/collection.mixin';
import ObservableMixin from '../mixin/observable.mixin';
import Base from './Base';
import Sprite from './sprite';

class Canvas extends ObservableMixin(CollectionMixin(Base)) {
  protected _size: Size = { width: 500, height: 500 };
  protected _viewResponse: number = 1;
  protected _lowerCanvas: HTMLCanvasElement;
  protected _upperCanvas: HTMLCanvasElement;
  protected _body: HTMLElement;
  protected _willOperateSprite: any;
  protected _hasMousedown: boolean;
  protected _recordSprite: any;
  protected _recordPoint: Pos;
  protected _recordTrackNode: number;
  protected _recordSpriteData: any;
  protected _viewRect: Rect;

  constructor(props: { canvas?: HTMLCanvasElement } = {}) {
    super();
    this._lowerCanvas = props && props.canvas; // 渲染视图
    this._upperCanvas = document.createElement('canvas'); // 事件响应、辅助线视图
    this._size = { width: 500, height: 500 };
    this._viewResponse = 1; // 实际渲染与最终成像之间的比例关系
    this._body = document.body;
    this._willOperateSprite = null; // 将要正在控制的对象
    this._hasMousedown = false; // 鼠标是否已经按下，区分划过、拖动
    this._recordSprite = null; // 当前正在控制的对象
    this._recordPoint = null;
    this._recordTrackNode = Track.TRACK_NODES().NONE;
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
  _initView(): void {
    if (!this._lowerCanvas) {
      throw new Error('You have to bind a canvas!');
    } else {
      const parent = this._lowerCanvas.parentNode as HTMLElement;
      const parentPositionStyle = parent.style.position;
      parent.insertBefore(this._upperCanvas, this._lowerCanvas.nextSibling);
      if (!parentPositionStyle || parentPositionStyle === 'static') {
        css(parent, { position: 'relative' });
      }
      css(this._lowerCanvas, {
        position: 'absolute',
      });
      css(this._upperCanvas, {
        position: 'absolute',
        'pointer-events': 'none',
      });
    }
  }

  _bindEvent(): void {
    this._lowerCanvas.addEventListener('mousedown', this._fireEvent);
    this._lowerCanvas.addEventListener('clcik', this._fireEvent);
    this._lowerCanvas.addEventListener('dblclick', this._fireEvent);
    this._lowerCanvas.addEventListener('mousemove', this._fireEvent);
  }

  _unbindEvent(): void {
    this._lowerCanvas.removeEventListener('mousedown', this._fireEvent);
    this._lowerCanvas.removeEventListener('clcik', this._fireEvent);
    this._lowerCanvas.removeEventListener('dblclick', this._fireEvent);
    this._lowerCanvas.removeEventListener('mouseover', this._fireEvent);
  }

  _bindEventForBody(): void {
    this._body.addEventListener('mousemove', this._fireEvent);
    this._body.addEventListener('mouseup', this._fireEvent);
  }

  _unbindEventForBody(): void {
    this._body.removeEventListener('mousemove', this._fireEvent);
    this._body.removeEventListener('mouseup', this._fireEvent);
  }

  /**
   * @description 触发鼠标事件
   * @param {*} mouseEvent
   */
  _fireEvent(mouseEvent: MouseEvent): void {
    const cursorPoint = calcCursorPoint(mouseEvent);
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
          this._recordTrackNode = this._recordSprite.calcTrackNode(this._recordPoint);
          this._recordSpriteData = this._recordSprite.encode();
          this.selectSprite(this._recordSprite.id);
        } else {
          this.deselectAll();
        }
        break;
      case 'click':
        break;
      case 'dblclick':
        break;
      case 'mousemove': {
        if (this._recordSprite) {
          const verctor =
            this._recordTrackNode === Track.TRACK_NODES().ROTATE
              ? offsetCursorPoint
              : calcVertor(this._recordPoint, offsetCursorPoint);
          this._recordSprite.transform(this._recordTrackNode, verctor, this._recordSpriteData);
          this.render();
        } else {
          const hoverSprite = this._getTopSprite(offsetCursorPoint);
          if (hoverSprite) {
            // TODO 渲染hover的track
            // eslint-disable-next-line no-unused-vars
            const hoverTrackNode = hoverSprite.calcTrackNode(offsetCursorPoint);
          }
        }
        break;
      }
      case 'mouseup':
        this._bindEvent();
        this._unbindEventForBody();
        if (this._recordSprite) {
          this._recordSprite.renderCache();
        }
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
   * @param {string} id
   */
  selectSprite(id: string): this {
    if (!id) return this.deselectAll();
    this.forEachItem((item) => {
      if (item.id === id) {
        if (!item.isSelected()) item.select();
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
      if (item.isSelected()) item.deselect();
    });

    return this;
  }

  /**
   * @description 获取最顶层的对象
   * @param {object} point
   * @param {number} point.x
   * @param {number} point.y
   * @returns {sprite}
   */
  _getTopSprite(point: Pos): Sprite {
    let top = null;
    let index = this.size();
    const allItems = this.all();
    const { NONE } = Track.TRACK_NODES();
    while (!top && index > 0) {
      const curItem = allItems[--index];
      top = curItem.calcTrackNode(point) !== NONE && curItem;
    }

    return top;
  }

  /**
   * @description 更新视图尺寸
   */
  _updateView() {
    const { width, height } = this._size;
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
    const { width, height } = this.getSize();
    this._lowerCanvas.getContext('2d').clearRect(0, 0, width, height);
  }

  /**
   * @description 清楚主视图画布
   */
  clearLowerCanvas() {
    clearCanvas(this._lowerCanvas);
  }

  /**
   * @description 清楚控制器画布
   */
  clearUpperCanvas() {
    clearCanvas(this._upperCanvas);
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
      if (sprite.isSelected()) {
        sprite.renderTrack(this._upperCanvas.getContext('2d'));
      }
    });
  }

  /**
   * @description 返回返回尺寸
   * @returns {object} size
   * @returns {number} size.widht
   * @returns {number} size.height
   */
  getSize(): Size {
    return this._size;
  }

  /**
   * @description 设置视图尺寸
   * @param {object} size
   * @param {number} size.width
   * @param {number} size.height
   * @return {object}
   */
  setSize(size: Size): this {
    this._size = { ...size };
    this._updateView();
    return this;
  }
}

export default Canvas;
