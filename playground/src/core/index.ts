import { Canvas } from 'dessin';

let dessinCanvas: any = null;

// TODO Avoid ts check error.
// Is there some resolutions to resolve it?
try {
  dessinCanvas = new Canvas();
} catch (e) {
  // do nothing
}

const COMMAND = {
  INIT_CANVAS: 'INIT_CANVAS',
  CHANGE_BKC: 'CHANGE_BKC',
  GET_ALL_STATE: 'GET_ALL_STATE',
};

function execute(command: string, value?: any) {
  switch (command) {
    case COMMAND.INIT_CANVAS:
      dessinCanvas = new Canvas({
        canvas: value as unknown as HTMLCanvasElement,
      });
      return dessinCanvas;
    case COMMAND.CHANGE_BKC:
      dessinCanvas.setBackgroundColor(value);
      dessinCanvas.render();
    case COMMAND.GET_ALL_STATE:
      return dessinCanvas.toJSON();
    default:
      throw new Error('command must be string.');
  }
}

export { COMMAND, execute };
