import { Canvas, Text, Rect, Circle } from '../../dist/dessin.js';

let canvasView = document.getElementById('canvas');
let canvas = new Canvas({ canvas: canvasView });
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
})
canvas.add(text);
canvas.add(rect);
canvas.add(circle);
canvas.render();
