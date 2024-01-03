import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import googleLoginWithPopup from "../utils/googlePopup";

export const loginWithGoogle = async () => {
  await googleLoginWithPopup(Apis.login, Apis.verify);
};

export const getCurrentUser = async () => {
  const response = await apiHelper.get(Apis.currentUser);
  return response;
};

export const checkUserAvailability = async (userName: string) => {
  const response = await apiHelper.get(`${Apis.checkUser}${userName}`);
  return response as boolean;
};

export const createPortfolio = async (userName: string) => {
  // Update the user name in the database
  await apiHelper.post(Apis.updateUserName, { userName });
  // Create a new portfolio
  await apiHelper.post(Apis.create, { userName });
};
