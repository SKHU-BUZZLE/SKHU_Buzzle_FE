import { create } from "zustand";

export enum inGameState {
  ready,
  matching,
  ingame,
}

interface MultiMatchState {
  state: inGameState;
  setState: (newState: inGameState) => void;
}

export const useMultiMatchStore = create<MultiMatchState>((set) => ({
  state: inGameState.ready,
  setState: (newState: inGameState) => set({ state: newState }),
}));
