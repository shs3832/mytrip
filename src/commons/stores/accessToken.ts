import { create } from "zustand";

interface IUseAccessTokenStore {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
}

export const useAccessTokenStore = create<IUseAccessTokenStore>((set) => ({
  accessToken: "",
  setAccessToken(newAccessToken: string) {
    return set(() => {
      return { accessToken: newAccessToken };
    });
  },
}));
