import constant from "./constant/constant";
import util from "./util/util";

export default (function() {

  let _view = null;
  let _owner = null;
  let _isMouseDown = false;
  let _isMouseDrag = false;

  function onMouseDown(e) {
    _isMouseDown = true;
    _owner.fireEvent(constant.MOUSE_DOWN, e);
    util.addEventListener(document.body, 'mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    let {MOUSE_HOVER, MOUSE_DRAG, MOUSE_MOVE} = constant;
    _owner.fireEvent(MOUSE_MOVE, e);
    if (_isMouseDown) {
      _owner.fireEvent(MOUSE_DRAG, e);
      _isMouseDrag = true;
    } else {
      _owner.fireEvent(MOUSE_HOVER, e);
    }
  }

  function onMouseUp(e) {
    let {MOUSE_UP, MOUSE_DROP} = constant;
    _owner.fireEvent(MOUSE_UP, e);
    if (_isMouseDrag) {
      _owner.fireEvent(MOUSE_DROP, e);
      _isMouseDrag = false;
    }
    _isMouseDown = false;
    util.removeEventListener(document.body, 'mouseup', onMouseUp);
  }

  function bindEvent() {
    util.addEventListener(_view, 'mousedown', onMouseDown);
    util.addEventListener(_view, 'mousemove', onMouseMove);
  }

  function unbindEvent() {
    util.removeEventListener(_view, 'mousedown', onMouseDown);
    util.removeEventListener(_view, 'mousemove', onMouseMove);
  }

  return {

    /**
     * @description 绑定视图及事件
     * @param {*} owner 
     * @param {*} view 
     */
    bindView: function (owner, view) {
      if (_view) {
        unbindEvent();
      }
      _view = view;
      _owner = owner;
      bindEvent();
    }
  }
})();