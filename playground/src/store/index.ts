import create from 'zustand';
import { COMMAND, execute } from '../core';
import { Size } from '../types';
import createTopbarStore, { TopbarState } from './createTopbarStore';

interface BaseState {
  updateAll: () => void;
  updateCanvasSize: (size: Size) => void;
}

type MyState = BaseState & TopbarState;

const useStore = create<MyState>((set, get) => ({
  ...createTopbarStore(set, get),
  updateAll: () => {
    const state = execute(COMMAND.GET_ALL_STATE);
    set({
      backgroundColor: state.backgroundColor,
    });
  },
  updateCanvasSize: (size) => {
    execute(COMMAND.UPDATE_CANVAS_SIZE, size);
  },
}));

export { MyState };
export default useStore;
