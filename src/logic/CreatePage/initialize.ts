import {
  errorLogger,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/utils";
import { User } from "../../utils/interface";
import { NavigateFunction } from "react-router-dom";
import { getCurrentUser } from "../../apis/user";

export default async function initializePage(
  user: User | null,
  navigator: NavigateFunction
) {
  if (!user) {
    // Check login status in local storage
    const isLoggedIn = getFromLocalStorage("login");
    // Navigate to login page if not logged in
    if (!isLoggedIn) {
      navigator("/login");
      return null;
    }
    // Fetch user data from server
    user = await getCurrentUser();
    if (!user) {
      errorLogger("User Not Logged In", "CreatePage");
      // Remove login status in local storage
      removeFromLocalStorage("login");
      // Redirect to login page if user not found
      navigator("/login");
      return null;
    }
  }
  // Check if user has userName
  if (user.userName !== "") {
    navigator("/edit");
  }
  return user;
}
