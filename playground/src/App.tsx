import { useCallback, useEffect, useRef } from 'react';
import './App.less';
import Header from './header/Header';
import { download } from 'downloadmejs';
import { COMMAND, execute } from './core';

function App() {
  const viewRef: any = useRef(null);
  const exportImage = useCallback(() => {
    download(viewRef.current.toDataURL(), { name: 'test.png' });
  }, []);

  useEffect(() => {
    const canvas = execute(COMMAND.INIT_CANVAS, viewRef.current);
    return () => {
      canvas.destroy();
    };
  }, []);

  return (
    <div className="w-full">
      <Header exportImage={exportImage} />
      <div className="content">
        <div w="502px" h="502px" border="1 solid dark-200">
          <canvas ref={viewRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
