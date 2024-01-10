import { logout } from "../../apis/user";
import { removeFromLocalStorage, removeTokenCookie } from "../../utils/utils";

export default function logoutLogic() {
  removeFromLocalStorage("login");
  removeFromLocalStorage("form");
  removeTokenCookie();
  logout();
}
