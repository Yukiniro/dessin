# [Dessin](https://github.com/Yukiniro/dessin)

[![license](https://img.shields.io/static/v1?label=licence&message=MIT&color=blue&style=flat-square)](https://github.com/Yukiniro/dessin/blob/main/LICENSE)
![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)
![npm](https://img.shields.io/npm/v/dessin?style=flat-square&color=blue)

# Introdution

Dessin is an HTML5 canvas render library witch is lightweight and clever. You can draw a rectangle, a circle even a text to use dessin. Here is a [demo](https://dessin-nine.vercel.app/)

# Fetures

- Completely canvas based rendering
- Supports text, rectangles, circles, and more...
- Chain API
- Import and export JSON data

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
});
canvas.add(text);
canvas.add(rect);
canvas.add(circle);
canvas.render();
```
