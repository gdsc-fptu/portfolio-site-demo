import { create } from "zustand";
import { AccountUser } from "../utils/interface";

type AppStoreProps = {
  user: AccountUser | null;
  setUser: (user: AccountUser | null) => void;
};
const useAppStore = create<AppStoreProps>((set) => ({
  user: null,
  setUser: (user: AccountUser | null) => set({ user }),
}));

export default useAppStore;
