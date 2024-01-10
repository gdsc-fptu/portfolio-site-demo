import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { User } from "../utils/interface";
import { getTokenCookie, setTokenCookie, infoLogger } from "../utils/utils";

export const verifyGoogleAccount = async (accessToken: String) => {
  const response = await apiHelper.post(Apis.verify, {
    token: accessToken,
  });
  console.info(response.message);
  const userData = (response.data as any).user as User;
  // Get Token response from server
  const token = (response.data as any).token as String;
  // Set token to cookie
  setTokenCookie(token);
  return userData;
};

export const getCurrentUser = async () => {
  // Get token from cookie
  const token = getTokenCookie();
  // Add token to api header
  apiHelper.addToken(token);
  // Get current user
  const response = await apiHelper.get(Apis.currentUser);
  infoLogger(response.message, "getCurrentUser");
  return response.data as User;
};

export const checkUserAvailability = async (userName: String) => {
  const response = await apiHelper.get(`${Apis.checkUser}${userName}`);
  infoLogger(response.message, "checkUserAvailability");
  return response.data as Boolean;
};

export const createPortfolio = async (userName: String) => {
  // Get token from cookie
  const token = getTokenCookie();
  // Add token to api header
  apiHelper.addToken(token);
  // Update the user name in the database
  const firstResponse = await apiHelper.post(Apis.updateUserName, { userName });
  console.info(firstResponse.message, "createPortfolio");
  // Create a new portfolio
  const secondResponse = await apiHelper.post(Apis.create, { userName });
  console.info(secondResponse.message, "createPortfolio");
};

export const logout = async () => {
  const response = await apiHelper.get(Apis.logout);
  infoLogger(response.message, "logout");
  return response.data;
};
