import { create } from "zustand";
import { FetchUserLoggedInQuery } from "../graphql/graphql";

type UserData = FetchUserLoggedInQuery["fetchUserLoggedIn"];
interface IUserData {
  userData: UserData | null;
  addUserData: (item: UserData | null) => void;
}

export const useUserDataStore = create<IUserData>((set) => ({
  userData: null,
  addUserData: (item) => {
    return set(() => {
      return { userData: item };
    });
  },
}));
