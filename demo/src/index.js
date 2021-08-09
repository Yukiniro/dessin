import {ZCanvas, ZText} from '../../dist/index.dev.js'

let canvasView = document.getElementById('canvas');
let canvas = new ZCanvas({canvas: canvasView});
let text = new ZText({
  value: ['hollo world', 'I am Yukiniro'],
  fillColor: '#FF0000', 
  x: 100,
  y: 200,
});
canvas.add(text);
canvas.render();