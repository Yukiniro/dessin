import create from 'zustand';
import createTopbarStore, { TopbarState } from './createTopbarStore';

type MyState = TopbarState;

const useStore = create<MyState>((set, get) => ({
  ...createTopbarStore(set, get),
}));

export { MyState };
export default useStore;
