import { create } from 'zustand';

interface FileStore {
  optimisticQueue: any[];
  addFileToQueue: (file: any) => void;
  clearQueue: () => void;
}

export const useFileStore = create<FileStore>((set) => ({
  optimisticQueue: [],
  addFileToQueue: (file) =>
    set((state) => ({
      optimisticQueue: [...state.optimisticQueue, file],
    })),
  clearQueue: () => set({ optimisticQueue: [] }),
}));
