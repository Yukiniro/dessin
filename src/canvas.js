import util from './util/util'
import collection from './mixin/collection.mixin'
import observable from './mixin/observable.mixin'

class Canvas {

  constructor(props = {}) {
    this.lowerCanvas = props && props.lowerCanvas; // 渲染视图
    this.upperCanvas = props && props.upperCanvas; // 事件响应、辅助线视图
    this.size = {width: 1, height: 1};
    this.viewResponse = 1; // 实际渲染与最终成像之间的比例关系
  }
}

util.mixin(Canvas.prototype, collection);
util.mixin(Canvas.prototype, observable);

export default Canvas;