import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
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
    }),
    {
      name: "auth-storage",
    }
  )
);
