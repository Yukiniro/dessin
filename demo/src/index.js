import { ZCanvas, ZText, ZRect, ZCircle } from '../../dist/dessin.js';

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
  width: 120,
  height: 100,
  value: '#0F0',
});
let circle = new ZCircle({
  x: 150, 
  y: 20,
  radius: 30,
  value: '#00F',
})
canvas.add(text);
canvas.add(rect);
canvas.add(circle);
canvas.render();
