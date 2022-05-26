import create from 'zustand';

interface CanvasStore {
  backgroundColor: string;
  changeBackgroundColor: (value: string) => void;
}

const useCanvasStore = create<CanvasStore>((set) => ({
  backgroundColor: '#972cb5',
  changeBackgroundColor: (value: string) => set({ backgroundColor: value }),
}));

export { useCanvasStore };
