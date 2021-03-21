import '../../build/bundle.js'

let { Canvas, Text } = window.CanvasCore;

let canvasView = document.getElementById('canvas');
let canvas = new Canvas({canvas: canvasView});
let text = new Text({
  value: ['hollo world', 'I am Yukiniro'],
  fillColor: '#FF0000', 
  x: 100,
  y: 100,
});
canvas.add(text);
canvas.render();