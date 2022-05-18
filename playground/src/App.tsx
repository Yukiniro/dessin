import { random } from 'bittydash';
import { useEffect, useRef } from 'react';
import { Canvas, Text, Rect, Circle } from '../../src/index';
import './App.less';
import { getRandomColor, getRandomPos, getRandomSize } from './util';

function App() {
  const viewRef: any = useRef(null);
  const cannvasRef: any = useRef(null);
  const addRect = () => {
    const rect = new Rect({
      ...getRandomPos(),
      ...getRandomSize(),
      fillColor: getRandomColor(),
    });
    cannvasRef.current.add(rect);
    cannvasRef.current.render();
  };
  const addCircle = () => {
    const circle = new Circle({
      ...getRandomPos(),
      radius: random(50, 100),
      fillColor: getRandomColor(),
    });
    cannvasRef.current.add(circle);
    cannvasRef.current.render();
  };
  const addText = () => {
    const text = new Text({
      ...getRandomPos(),
      fillColor: getRandomColor(),
      texts: ['hollo world'],
    });
    cannvasRef.current.add(text);
    cannvasRef.current.render();
  };
  useEffect(() => {
    let canvas = new Canvas({ canvas: viewRef.current as unknown as HTMLCanvasElement });
    cannvasRef.current = canvas;
  });

  useEffect(() => {
    addRect();
    addCircle();
    addText();
  });

  return (
    <div className="app">
      <div className="content">
        <div className="operate">
          <button onClick={addRect}>Add Rect</button>
          <button onClick={addCircle}>Add Circle</button>
          <button onClick={addText}>Add Text</button>
        </div>
        <div className="preview">
          <canvas ref={viewRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
