import { removeFromLocalStorage, removeTokenCookie } from "../../utils/utils";

export default function initializePage() {
  // Reset form data in local storage
  removeFromLocalStorage("form");
  // Reset login status in local storage
  removeFromLocalStorage("login");
  // Remove token in cookie
  removeTokenCookie();
}
