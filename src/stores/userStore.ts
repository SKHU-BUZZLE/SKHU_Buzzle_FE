import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getMyPage, getUserLife } from "../api/user";

interface UserData {
  name: string;
  email: string;
  picture: string;
  streak: number;
}

interface UserStore {
  user: UserData | null;
  life: number;
  fetchUser: () => Promise<void>;
  fetchLife: () => Promise<void>;
  setLife: (life: number) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      life: 0,

      fetchUser: async () => {
        if (get().user) return;

        try {
          const res = await getMyPage();
          set({ user: res.data.data });
        } catch (error) {
          console.error("유저 정보 조회 실패", error);
        }
      },

      fetchLife: async () => {
        try {
          const res = await getUserLife();
          set({ life: res.data.data.life });
        } catch (error) {
          console.error("생명 수 조회 실패", error);
        }
      },

      setLife: (life) => set({ life }),
      clearUser: () => set({ user: null, life: 0 }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
