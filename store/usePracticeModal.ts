import { create } from "zustand";

interface PracticeModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const usePracticeModal = create<PracticeModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
