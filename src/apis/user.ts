import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { AccountUser } from "../utils/interface";

export const verifyGoogleAccount = async (accessToken: String) => {
  const response = await apiHelper.post(Apis.verify, {
    token: accessToken,
  });
  console.info(response.message);
  return response.data as AccountUser;
};

export const getCurrentUser = async () => {
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
  // Update the user name in the database
  const firstResponse = await apiHelper.post(Apis.updateUserName, { userName });
  console.info(firstResponse.message);
  // Create a new portfolio
  const secondResponse = await apiHelper.post(Apis.create, { userName });
  console.info(secondResponse.message);
};

export const logout = async () => {
  const response = await apiHelper.get(Apis.logout);
  console.info(response.message);
  return response.data;
};
