import { create } from "zustand";

interface HeartsModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useHeartsModal = create<HeartsModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
