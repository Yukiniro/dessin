import { SetState, GetState } from 'zustand';
import { MyState } from '.';
import { COMMAND, execute } from '../core';
import { Pos, OperateType } from '../types';

interface TopbarState {
  backgroundColor: string;
  operateType: OperateType;
  deleteDisabled: boolean;
  groupDisabled: boolean;
  groupType: 'group' | 'ungroup';
  changeOperateType: (type: OperateType) => void;
  changeBackgroundColor: (value: string) => void;
  createGraph: (startPoint: Pos, endPoint: Pos) => void;
  toggleGroup: () => void;
  updateGroupStatus: () => void;
  updateDeleteStatus: () => void;
  deleteSprite: () => void;
}

const _updateGroupStatus = (set: SetState<MyState>) => {
  const status = execute(COMMAND.GET_GROUP_STATUS);
  switch (status) {
    case 'disabled':
      set({ groupDisabled: true, groupType: 'group' });
      break;
    default:
      set({
        groupDisabled: false,
        groupType: status,
      });
  }
};

const _updateDeleteStatus = (set: SetState<MyState>) => {
  set({ deleteDisabled: !execute(COMMAND.GET_DELETE_STATUS) });
};

const createTopbarStore = (set: SetState<MyState>, get: GetState<MyState>): TopbarState => ({
  backgroundColor: '#FFFFFF',
  operateType: 'handle',
  deleteDisabled: true,
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
    _updateDeleteStatus(set);
  },
  toggleGroup: () => {
    execute(COMMAND.TOGGLE_GROUP);
    _updateGroupStatus(set);
    _updateDeleteStatus(set);
  },
  updateGroupStatus: () => {
    _updateGroupStatus(set);
  },
  updateDeleteStatus: () => {
    _updateDeleteStatus(set);
  },
  deleteSprite: () => {
    execute(COMMAND.DELETE_GRAPH);
    _updateDeleteStatus(set);
  },
});

export { TopbarState };
export default createTopbarStore;
