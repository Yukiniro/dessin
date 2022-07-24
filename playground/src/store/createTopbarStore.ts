import { SetState, GetState } from 'zustand';
import { MyState } from '.';
import { COMMAND, execute } from '../core';
import { Pos, OperateType } from '../types';

interface TopbarState {
  backgroundColor: string;
  operateType: OperateType;
  groupDisabled: boolean;
  groupType: 'group' | 'ungroup';
  changeOperateType: (type: OperateType) => void;
  changeBackgroundColor: (value: string) => void;
  createGraph: (startPoint: Pos, endPoint: Pos) => void;
  toggleGroup: () => void;
}

const createTopbarStore = (set: SetState<MyState>, get: GetState<MyState>): TopbarState => ({
  backgroundColor: '#FFFFFF',
  operateType: 'handle',
  groupDisabled: true,
  groupType: 'group',
  changeOperateType: (type: OperateType) => {
    set({ operateType: type });
  },
  changeBackgroundColor: (value: string) => {
    execute(COMMAND.CHANGE_BKC, value);
    set({ backgroundColor: value });
  },
  createGraph: (startPoint: Pos, endPoint: Pos) => {
    const { operateType } = get();
    execute(COMMAND.CREATE_GRAPH, { operateType, startPoint, endPoint });
  },
  toggleGroup: () => {
    execute(COMMAND.TOGGLE_GROUP);
  },
});

export { TopbarState };
export default createTopbarStore;
