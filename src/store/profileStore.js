import { create } from "zustand";
import { getProfile } from "../api/network";

const initialState = {
  profile: null,
  error: null,
  isLoading: false,
};

export const useProfileStore = create((set) => ({
  ...initialState,
  getProfile: async () => {
    try {
      set({ isLoading: false, error: null });

      const { data } = await getProfile();
      set({ profile: data });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {
    set(initialState);
  },
}));
