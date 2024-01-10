import { getPortfolios } from "../../apis/read";
import { getCurrentUser } from "../../apis/user";
import { User } from "../../utils/interface";
import {
  errorLogger,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/utils";
import sortPortfolio from "./sortPortfolio";

export default async function initializePage(
  role: String | null,
  user: User | null
) {
  // Check if user is exist
  if (!user) {
    // Check if user is logged in in local storage
    const isLoggedIn = getFromLocalStorage("login");

    // If user is logged in, get user data from server
    if (isLoggedIn) {
      user = await getCurrentUser();
      if (!user) {
        errorLogger("User Not Logged In", "HomePage");
        // Remove login status in local storage
        removeFromLocalStorage("login");
      }
    }
  }

  // Get portfolios
  let portfolios = await getPortfolios(role);

  // Sort portfolios
  portfolios = sortPortfolio(portfolios);

  return { portfolios, user };
}
