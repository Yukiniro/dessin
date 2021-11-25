# [dessin](https://github.com/Yukiniro/dessin)
[![license](https://img.shields.io/apm/l/dessin?style=flat-square)](https://github.com/Yukiniro/dessin/blob/main/LICENSE)

# Introdution
 一个基于canvas的JavaScript渲染库。

# Fetures
- 完全基于canvas渲染
- 支持文字、矩形、圆形等
- 链式API

# Install
```bash
npm i dessin
```
# Getting Started
```javascript
import { Canvas, Text, Rect, Circle } from 'dessin';

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
```