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
  const cannvasRef: any = useRef(null);
  const addRect = useCallback(() => {
    const rect = new Rect({
      ...getRandomPos(),
      ...getRandomSize(),
      fillColor: getRandomColor(),
    });
    cannvasRef.current.add(rect);
  }, []);
  const addCircle = useCallback(() => {
    const circle = new Circle({
      ...getRandomPos(),
      radius: random(50, 100),
      fillColor: getRandomColor(),
    });
    cannvasRef.current.add(circle);
  }, []);
  const addText = useCallback(() => {
    const text = new Text({
      ...getRandomPos(),
      fillColor: getRandomColor(),
      texts: ['hollo world'],
    });
    cannvasRef.current.add(text);
  }, []);
  const exportImage = useCallback(() => {
    console.log(viewRef.current.toDataURL());
    download(viewRef.current.toDataURL(), { name: 'test.png' });
  }, []);
  useEffect(() => {
    let canvas = new Canvas({ canvas: viewRef.current as unknown as HTMLCanvasElement });
    cannvasRef.current = canvas;
  });

  useEffect(() => {
    addRect();
    addCircle();
    addText();
  });

  useEffect(() => {
    return subscribe('delete', () => {
      const selectedSprite = cannvasRef.current.selectedSprite();
      if (selectedSprite) {
        cannvasRef.current.remove(selectedSprite);
      }
    });
  }, []);

  return (
    <div className="w-full">
      <Header exportImage={exportImage} addCircle={addCircle} addText={addText} addRect={addRect} />
      <div className="content">
        <div w="500px" h="500px" border="1 solid dark-200">
          <canvas ref={viewRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
