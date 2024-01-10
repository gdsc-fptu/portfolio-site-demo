import { NavigateFunction } from "react-router-dom";
import { Portfolio, User } from "../../utils/interface";
import {
  errorLogger,
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../utils/utils";
import { getCurrentUser } from "../../apis/user";
import { fetchPortfolio, fetchPortfolioImage } from "./fetchPortfolio";

export default async function initializePage(
  user: User | null,
  navigator: NavigateFunction
) {
  let data: Portfolio | null = null;
  let imageUrl: String | null = null;
  if (!user) {
    // Check if user is logged in in local storage
    const isLoggedIn = getFromLocalStorage("login");
    if (!isLoggedIn) {
      navigator("/login");
      return { user, data, imageUrl };
    }
    // Fetch user data from server
    user = await getCurrentUser();
    if (!user) {
      errorLogger("User Not Logged In", "EditPage");
      // Remove login status in local storage
      removeFromLocalStorage("login");
      // Redirect to login page
      navigator("/login");
      return { user, data, imageUrl };
    }
  }

  // Check if user has userName
  if (user.userName === "") {
    navigator("/create");
    return { user, data, imageUrl };
  }

  // Check if user has portfolio in local storage
  let portfolio = getFromLocalStorage("form") as Portfolio;

  if (!portfolio) {
    // Fetch portfolio data from server
    const portfolioResponse = await fetchPortfolio(user.userName);

    // If portfolio data not found, redirect to 404 page
    if (!portfolioResponse.data) {
      navigator("/404");
      return { user, data, imageUrl };
    }

    data = portfolioResponse.data;
    imageUrl = portfolioResponse.imageUrl;
  } else {
    data = portfolio;
    // Only fetch image from server
    imageUrl = await fetchPortfolioImage(portfolio.imageUrl);
  }

  // Set data to local storage
  setToLocalStorage("form", data);

  return { user, data, imageUrl };
}
