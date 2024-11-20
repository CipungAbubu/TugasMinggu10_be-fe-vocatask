import { create } from "zustand";
import { createTask, getAllTask } from "../api/network";

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
};

export const useTaskStore = create((set, get) => ({
  ...initialState,
  createTask: async (title) => {
    try {
      set({ error: null });
      await createTask(title);
      await get().getTasks();
    } catch (error) {
      set({ error });
    }
  },
  getTasks: async () => {
    try {
      set({ isLoading: true, error: null });
  
      const { data } = await getAllTask();
      console.log("data", data);
      set({ tasks: data });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false }); 
    }
  }  
}));
