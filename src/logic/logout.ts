import { logout } from "../apis/user";
import { removeFromLocalStorage, removeTokenCookie } from "../utils/utils";

export default function processLogout() {
  removeFromLocalStorage("login");
  removeFromLocalStorage("form");
  removeTokenCookie();
  logout();
}
