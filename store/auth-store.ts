import { create } from "zustand";

interface User {
  email: string;
}

interface AuthState {
  isLoading: boolean;
  user: User | null;
  setLoading: (v: boolean) => void;
  setAuth: (user: User) => void;
  logout: () => void;
  /** Helper used by AuthGuard */
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  isLoading: false,
  user: null,

  setLoading: (v) => set({ isLoading: v }),

  setAuth: (user) => set({ user }),

  logout: () => set({ user: null }),

  isAuthenticated: () => Boolean(get().user),
}));
