import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import './App.less';
import Header from './components/header/Header';
import { download } from 'downloadmejs';
import { COMMAND, execute } from './core';
import useStore from './store';
import useMouseDrag from './hooks/useMouseDrag';

function App() {
  const [viewSize, updateViewSize] = useState({ width: 500, height: 500 });
  const viewRef: RefObject<HTMLCanvasElement> = useRef(null);
  const viewBoxRef: RefObject<HTMLDivElement> = useRef(null);
  const exportImage = useCallback(() => {
    const canvas = viewRef.current as unknown as HTMLCanvasElement;
    download(canvas.toDataURL(), { name: 'test.png' });
  }, []);
  const { updateAll, createGraph, updateCanvasSize } = useStore((state) => state);

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
  }, [viewBoxRef.current]);

  useEffect(() => {
    viewBoxRef.current?.addEventListener('resize', resizeHandle);
    resizeHandle();
    return () => {
      viewBoxRef.current?.removeEventListener('resize', resizeHandle);
    };
  }, []);

  useEffect(() => {
    const canvas = execute(COMMAND.INIT_CANVAS, viewRef.current);
    updateAll();
    resizeHandle();
    return () => {
      canvas.destroy();
    };
  }, []);

  const [actionType, startPoint, endPoint] = useMouseDrag(viewBoxRef);
  useEffect(() => {
    if (actionType === 'end') {
      createGraph(startPoint, endPoint);
    }
  }, [actionType]);

  return (
    <div className="w-screen h-screen">
      <Header exportImage={exportImage} />
      <div ref={viewBoxRef} className="w-full h-full">
        <canvas ref={viewRef} width={viewSize.width} height={viewSize.height}></canvas>
      </div>
    </div>
  );
}

export default App;
