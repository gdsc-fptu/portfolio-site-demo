import { removeFromLocalStorage, setToLocalStorage } from "../../utils/utils";
import { verifyGoogleAccount } from "../../apis/user";

export default async function loginLogic(accessToken: String) {
  const user = await verifyGoogleAccount(accessToken);
  // Set login status to local storage
  setToLocalStorage("login", true);
  // Reset form data in local storage
  removeFromLocalStorage("form");
  return user;
}
