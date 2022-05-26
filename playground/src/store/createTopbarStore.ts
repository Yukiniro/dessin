import { GetState, SetState } from 'zustand';
import { COMMAND, execute } from '../core';
import { MyState } from './index';

interface TopbarState {
  backgroundColor: string;
  changeBackgroundColor: (value: string) => void;
}

const createTopbarStore = (set: SetState<MyState>, get: GetState<MyState>) => ({
  backgroundColor: '#FFFFFF',
  changeBackgroundColor: (value: string) => {
    execute(COMMAND.CHANGE_BKC, value);
    set({ backgroundColor: value });
  },
});

export { TopbarState };
export default createTopbarStore;
