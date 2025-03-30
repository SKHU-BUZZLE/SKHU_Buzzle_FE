import { create } from "zustand";

export enum inGameState {
  ready,
  matching,
  ingame,
}

interface MultiMatchState {
  roomId: string | null;
  state: inGameState;
  setState: (newState: inGameState) => void;
  setRoomId: (newRoomId: string) => void;
}

export const useMultiMatchStore = create<MultiMatchState>((set) => ({
  roomId: null,
  state: inGameState.ready,
  setState: (newState: inGameState) => {
    console.log("State changed to", inGameState[newState]);
    set({ state: newState });
  },
  setRoomId: (newRoomId: string) => {
    set({ roomId: newRoomId });
  },
}));
