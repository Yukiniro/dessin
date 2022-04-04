import { useEffect, useRef, useState } from 'react';
import { Canvas, Text, Rect, Circle } from '../../src/index';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  useEffect(() => {
    let canvas = new Canvas({ canvas: canvasRef.current as unknown as HTMLCanvasElement });
    let text = new Text({
      texts: ['hollo world', 'I am Yukiniro'],
      fillColor: '#FF0000',
      x: 100,
      y: 200,
    });
    let rect = new Rect({
      x: 20,
      y: 20,
      width: 120,
      height: 100,
      fillColor: '#0F0',
    });
    let circle = new Circle({
      x: 150,
      y: 20,
      radius: 30,
      fillColor: '#00F',
    });
    canvas.add(text);
    canvas.add(rect);
    canvas.add(circle);
    canvas.render();
  });
  return (
    <div className="App">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
