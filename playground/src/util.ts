import { random, randomColor } from 'bittydash';
import { Pos, Size } from './types';

function getRandomColor(): string {
  return randomColor('hex');
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
