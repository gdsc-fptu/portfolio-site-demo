import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { AccountUser } from "../utils/interface";
import {
  getTokenCookie,
  removeFromLocalStorage,
  setTokenCookie,
} from "../utils/utils";

export const verifyGoogleAccount = async (accessToken: String) => {
  const response = await apiHelper.post(Apis.verify, {
    token: accessToken,
  });
  console.info(response.message);
  const userData = (response.data as any).user as AccountUser;
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
  console.info(response.message);
  return response.data as AccountUser;
};

export const checkUserAvailability = async (userName: String) => {
  const response = await apiHelper.get(`${Apis.checkUser}${userName}`);
  console.info(response.message);
  return response.data as Boolean;
};

export const createPortfolio = async (userName: String) => {
  // Remove current portfolio in local storage
  removeFromLocalStorage("form");
  // Get token from cookie
  const token = getTokenCookie();
  // Add token to api header
  apiHelper.addToken(token);
  // Update the user name in the database
  const firstResponse = await apiHelper.post(Apis.updateUserName, { userName });
  console.info(firstResponse.message);
  // Save new user token
  const newToken = firstResponse.data as String;
  setTokenCookie(newToken);
  // Create a new portfolio
  const secondResponse = await apiHelper.post(Apis.create, { userName });
  console.info(secondResponse.message);
};

export const logout = async () => {
  const response = await apiHelper.get(Apis.logout);
  console.info(response.message);
  return response.data;
};
