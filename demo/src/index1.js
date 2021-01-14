import '../../build/bundle.js'

let { Canvas, Text } = window.CanvasCore;

let canvasView = document.getElementById('canvas');
let canvas = new Canvas({canvas: canvasView});