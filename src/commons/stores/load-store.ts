import { create } from "zustand";
interface ILoadStore {
  isLoaded: boolean;
  setIsLoaded: () => void;
}

export const useLoadStore = create<ILoadStore>((set) => ({
  isLoaded: false,
  setIsLoaded() {
    return set(() => {
      return { isLoaded: true };
    });
  },
}));
