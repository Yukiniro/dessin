import { ZCanvas, ZText, ZRect } from '../../dist/index.dev.js';

let canvasView = document.getElementById('canvas');
let canvas = new ZCanvas({ canvas: canvasView });
let text = new ZText({
  value: ['hollo world', 'I am Yukiniro'],
  fillColor: '#FF0000',
  x: 100,
  y: 200,
});
let rect = new ZRect({
  x: 20, 
  y: 20,
  width: 100,
  height: 100,
  value: '#0F0',
})
canvas.add(text);
canvas.add(rect);
canvas.render();
