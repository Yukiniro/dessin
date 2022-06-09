import { RefObject, useEffect, useState } from 'react';
import { calcCursorPoint, calcVertor } from 'dessin';
import { Pos } from '../types';

function useMouseDrag(ref: RefObject<HTMLElement>): [string, Pos, Pos] {
  const [actionType, setActionType] = useState('start');
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });

  const getAnchorPoint = () => {
    const dom: HTMLElement = ref.current as unknown as HTMLElement;
    const rect = dom.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
    };
  };

  useEffect(() => {
    const dom: HTMLElement = ref.current as unknown as HTMLElement;
    function handleMouseDown(event: MouseEvent) {
      const anchorPoint = getAnchorPoint();
      const downPoint = calcCursorPoint(event);
      setActionType('start');
      setStartPoint(calcVertor(anchorPoint, downPoint));
    }
    function handleMouseUp(event: MouseEvent) {
      const anchorPoint = getAnchorPoint();
      const upPoint = calcCursorPoint(event);
      setActionType('end');
      setEndPoint(calcVertor(anchorPoint, upPoint));
    }

    dom.addEventListener('mousedown', handleMouseDown);
    dom.addEventListener('mouseup', handleMouseUp);

    return () => {
      dom.removeEventListener('mousedown', handleMouseDown);
      dom.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return [actionType, startPoint, endPoint];
}

export default useMouseDrag;
