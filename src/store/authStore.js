import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as httpLogin } from "../api/network";

const initialState = {
  token: null,
  isLoading: false,
  error: null,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      login: async ({ email, password }) => {
        try {
          set(() => ({ isLoading: true, error: null }));
          const { data } = await httpLogin({ email, password });
          set(() => ({
            token: data.token,
          }));
        } catch (error) {
          console.error(error);
          set(() => ({ error: error }));
        } finally {
          set(() => ({ isLoading: false }));
        }
      },

      logout: () => {
        set(() => ({ token: null }));
      },
    }),
    {
      getStorage: () => localStorage,
      name: "auth-storage",
    }
  )
);
