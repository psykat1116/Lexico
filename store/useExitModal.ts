import { create } from "zustand";

interface ExitModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useExitModal = create<ExitModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
