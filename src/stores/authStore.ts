import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./userStore";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      setAccessToken: (token) => {
        console.log(token);
        set({ accessToken: token, isAuthenticated: !!token });
      },
      clearAccessToken: () =>
        set({ accessToken: null, isAuthenticated: false }),

      logout: () => {
        set({ accessToken: null, isAuthenticated: false });
        useUserStore.getState().clearUser();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
