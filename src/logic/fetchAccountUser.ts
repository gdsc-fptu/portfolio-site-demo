import { getCurrentUser } from "../apis/user";
import { AccountUser } from "../utils/interface";
import { getFromLocalStorage } from "../utils/utils";

export async function fetchAccountUser(
  setUser: (user: AccountUser | null) => void
) {
  const isLoggedIn = getFromLocalStorage("login");
  if (!isLoggedIn) {
    setUser(null);
    return;
  }
  const user = await getCurrentUser();
  if (!user) {
    setUser(null);
    return;
  }
  setUser(user);
}
