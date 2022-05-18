import { random } from 'bittydash';
import { Pos, Size } from './types';

function getRandomColor(): string {
  const signs = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += signs[random(0, signs.length - 1)];
  }
  return color;
}

function getRandomSize(): Size {
  return {
    width: random(50, 200),
    height: random(50, 200),
  };
}

function getRandomPos(): Pos {
  return {
    x: random(10, 350),
    y: random(10, 350),
  };
}

export { getRandomColor, getRandomSize, getRandomPos };
