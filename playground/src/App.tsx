import { CSSProperties, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.less';
import Header from './components/header/Header';
import { download } from 'downloadmejs';
import { COMMAND, execute } from './core';
import useStore from './store';
import useMouseDrag from './hooks/useMouseDrag';
import { calcRectForFrame, EventConstant } from 'dessin';

function App() {
  const [viewSize, updateViewSize] = useState({ width: 500, height: 500 });
  const viewRef: RefObject<HTMLCanvasElement> = useRef(null);
  const viewBoxRef: RefObject<HTMLDivElement> = useRef(null);
  const viewHandleRef: RefObject<HTMLDivElement> = useRef(null);
  const exportImage = useCallback(() => {
    const canvas = viewRef.current as unknown as HTMLCanvasElement;
    download(canvas.toDataURL(), { name: 'test.png' });
  }, []);
  const { updateAll, createGraph, updateCanvasSize, updateGroupStatus, operateType } = useStore(
    (state) => state
  );

  const resizeHandle = useCallback(() => {
    const rect = viewBoxRef.current?.getBoundingClientRect();
    if (rect) {
      const size = {
        width: rect.width,
        height: rect.height,
      };
      updateViewSize(size);
      updateCanvasSize(size);
    }
  }, [updateCanvasSize]);

  useEffect(() => {
    const dom = viewBoxRef.current;
    dom?.addEventListener('resize', resizeHandle);
    resizeHandle();
    return () => {
      dom?.removeEventListener('resize', resizeHandle);
    };
  }, [resizeHandle]);

  useEffect(() => {
    const dessinCanvas = execute(COMMAND.INIT_CANVAS, viewRef.current);
    updateAll();
    resizeHandle();
    return () => {
      dessinCanvas.destroy();
    };
  }, [resizeHandle, updateAll]);

  useEffect(() => {
    const dessinCanvas = execute(COMMAND.GET_CANVAS);
    const handler = () => {
      updateGroupStatus();
    };
    dessinCanvas.on(EventConstant.MOUSE_UP, handler);
    return () => {
      dessinCanvas.off(EventConstant.MOUSE_UP, handler);
    };
  }, [updateGroupStatus]);

  const [actionType, startPoint, changePoint, endPoint] = useMouseDrag(viewHandleRef);
  useEffect(() => {
    if (actionType === 'end') {
      createGraph(startPoint, endPoint);
    }
  }, [actionType, createGraph, endPoint, startPoint]);

  const viewHandleStyle = useMemo(() => {
    return {
      pointerEvents: operateType === 'handle' ? 'none' : 'auto',
    };
  }, [operateType]);

  const viewHandlePreviewStyle = useMemo(() => {
    const { x, y, width, height } = calcRectForFrame(startPoint, changePoint) || {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    return {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  }, [startPoint, changePoint]);

  return (
    <div className="w-screen h-screen">
      <Header exportImage={exportImage} />
      <div ref={viewBoxRef} className="w-full h-full">
        <canvas ref={viewRef} width={viewSize.width} height={viewSize.height}></canvas>
        <div
          ref={viewHandleRef}
          className="w-full h-full absolute"
          style={viewHandleStyle as unknown as CSSProperties}
        >
          {operateType !== 'handle' && actionType === 'change' && (
            <div className="absolute bg-blue-400 opacity-65" style={viewHandlePreviewStyle} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
