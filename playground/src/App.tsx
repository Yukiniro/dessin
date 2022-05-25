import { random } from 'bittydash';
import { useCallback, useEffect, useRef } from 'react';
import { Canvas, Text, Rect, Circle } from 'dessin';
import './App.less';
import { getRandomColor, getRandomPos, getRandomSize } from './util';
import { subscribe } from 'toukey';
import Header from './header/Header';
import { download } from 'downloadmejs';

function App() {
  const viewRef: any = useRef(null);
  const canvasRef: any = useRef(null);
  const addRect = useCallback(() => {
    const rect = new Rect({
      ...getRandomPos(),
      ...getRandomSize(),
      fillColor: getRandomColor(),
    });
    canvasRef.current.add(rect);
  }, []);
  const addCircle = useCallback(() => {
    const circle = new Circle({
      ...getRandomPos(),
      radius: random(50, 100),
      fillColor: getRandomColor(),
    });
    canvasRef.current.add(circle);
  }, []);
  const addText = useCallback(() => {
    const text = new Text({
      ...getRandomPos(),
      fillColor: getRandomColor(),
      texts: ['hollo world'],
    });
    canvasRef.current.add(text);
  }, []);

  const exportImage = useCallback(() => {
    download(viewRef.current.toDataURL(), { name: 'test.png' });
  }, []);

  useEffect(() => {
    let canvas = new Canvas({
      canvas: viewRef.current as unknown as HTMLCanvasElement,
      backgroundColor: getRandomColor(),
    });
    canvasRef.current = canvas;

    return () => {
      canvasRef.current.destroy();
      canvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    addRect();
    addCircle();
    addText();
  }, []);

  useEffect(() => {
    return subscribe('delete', () => {
      const selectedSprite = canvasRef.current.selectedSprite();
      if (selectedSprite) {
        canvasRef.current.remove(selectedSprite);
      }
    });
  }, []);

  return (
    <div className="w-full">
      <Header exportImage={exportImage} addCircle={addCircle} addText={addText} addRect={addRect} />
      <div className="content">
        <div w="502px" h="502px" border="1 solid dark-200">
          <canvas ref={viewRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
