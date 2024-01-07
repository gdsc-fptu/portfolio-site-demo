import { getCurrentUser } from "../apis/user";
import { AccountUser, User } from "../utils/interface";
import { fetchPortfolioData } from "./getPortfolio";

export async function processGetUser(
  user: AccountUser | null,
  onNotLoggedIn?: () => void,
  onNewUser?: () => void,
  onSucess?: (data: User | null, imageUrl: String | null) => void,
  onFail?: () => void
) {
  let responseUser: AccountUser | null = user;
  // If Not User in Context, try to get user from API
  if (!user) {
    responseUser = await getCurrentUser();
  }
  // If User not Logged in, redirect to login page
  if (!responseUser) {
    onNotLoggedIn && onNotLoggedIn();
    return;
  }

  // If user is new (userName is ""), redirect to creating page
  if (responseUser.userName === "") {
    onNewUser && onNewUser();
    return;
  }

  // Fetch portfolio data
  const { data, imageUrl } = await fetchPortfolioData(responseUser.userName);

  if (!data) {
    // If portfolio data not found, redirect to 404 page
    onFail && onFail();
    return;
  }

  // Set data to state
  onSucess && onSucess(data, imageUrl);

  return responseUser;
}
