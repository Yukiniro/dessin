import { RefObject, useCallback, useEffect, useRef } from 'react';
import './App.less';
import Header from './header/Header';
import { download } from 'downloadmejs';
import { COMMAND, execute } from './core';
import useStore from './store';
import useMouseDrag from './hooks/useMouseDrag';

function App() {
  const viewRef: RefObject<HTMLCanvasElement> = useRef(null);
  const viewBoxRef: RefObject<HTMLDivElement> = useRef(null);
  const exportImage = useCallback(() => {
    const canvas = viewRef.current as unknown as HTMLCanvasElement;
    download(canvas.toDataURL(), { name: 'test.png' });
  }, []);
  const { updateAll, createGraph } = useStore((state) => state);

  useEffect(() => {
    const canvas = execute(COMMAND.INIT_CANVAS, viewRef.current);
    updateAll();
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
    <div className="w-full">
      <Header exportImage={exportImage} />
      <div className="content">
        <div ref={viewBoxRef} w="502px" h="502px" border="1 solid dark-200">
          <canvas ref={viewRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
