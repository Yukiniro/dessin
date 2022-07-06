import { RefObject, useCallback, useEffect, useState } from 'react';
import { calcCursorPoint, calcVertor } from 'dessin';
import { Pos } from '../types';

function useMouseDrag(ref: RefObject<HTMLElement>): [string, Pos, Pos, Pos] {
  const [actionType, setActionType] = useState('start');
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [changePoint, setChangePoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });

  const getAnchorPoint = useCallback(() => {
    const dom: HTMLElement = ref.current as unknown as HTMLElement;
    const rect = dom.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
    };
  }, [ref]);

  useEffect(() => {
    const dom: HTMLElement = ref.current as unknown as HTMLElement;
    function handleMouseDown(event: MouseEvent) {
      const anchorPoint = getAnchorPoint();
      const downPoint = calcCursorPoint(event);
      setActionType('start');
      setStartPoint(calcVertor(anchorPoint, downPoint));
      dom.addEventListener('mousemove', handleMouseMove);
    }
    function handleMouseUp(event: MouseEvent) {
      const anchorPoint = getAnchorPoint();
      const upPoint = calcCursorPoint(event);
      setActionType('end');
      setEndPoint(calcVertor(anchorPoint, upPoint));
      dom.removeEventListener('mousemove', handleMouseMove);
    }
    function handleMouseMove(event: MouseEvent) {
      const anchorPoint = getAnchorPoint();
      const movePoint = calcCursorPoint(event);
      setActionType('change');
      setChangePoint(calcVertor(anchorPoint, movePoint));
    }
    dom.addEventListener('mousedown', handleMouseDown);
    dom.addEventListener('mouseup', handleMouseUp);
    return () => {
      dom.removeEventListener('mousedown', handleMouseDown);
      dom.removeEventListener('mouseup', handleMouseUp);
    };
  }, [getAnchorPoint, ref]);
  return [actionType, startPoint, changePoint, endPoint];
}

export default useMouseDrag;
