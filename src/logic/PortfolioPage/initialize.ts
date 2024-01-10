import { NavigateFunction } from "react-router-dom";
import { getPortfolio } from "../../apis/read";
import { Portfolio, User } from "../../utils/interface";
import {
  errorLogger,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/utils";
import { getCurrentUser } from "../../apis/user";

export default async function initializePage(
  id: String,
  navigator: NavigateFunction,
  user: User | null
) {
  let portfolio: Portfolio | null = null;
  if (!user) {
    // Check if user is logged in
    const isLoggedIn = getFromLocalStorage("login");

    // Navigate to login page if user is not logged in
    if (isLoggedIn) {
      // Fetch user data if user is logged in
      user = await getCurrentUser();
      if (!user) {
        errorLogger("User Not Logged In", "PortfolioPage");
        // Remove login status in local storage
        removeFromLocalStorage("login");
      }
    }
  }

  portfolio = await getPortfolio(id);

  // Navigate to 404 page if portfolio does not exist
  if (!portfolio) {
    navigator("/404");
    return { user, portfolio: null };
  }

  return { user, portfolio };
}
