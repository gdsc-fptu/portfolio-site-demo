import { create } from "zustand";
import { User } from "../utils/interface";

type AppStoreProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};
const useAppStore = create<AppStoreProps>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));

export default useAppStore;
