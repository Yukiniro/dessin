import create from 'zustand';
import { COMMAND, execute } from '../core';
import createTopbarStore, { TopbarState } from './createTopbarStore';

interface BaseState {
  updateAll: () => void;
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
}));

export { MyState };
export default useStore;
