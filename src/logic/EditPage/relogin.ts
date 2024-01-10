import { setToLocalStorage } from "../../utils/utils";
import { verifyGoogleAccount } from "../../apis/user";
import { fetchPortfolio } from "./fetchPortfolio";

export default async function reloginLogic(accessToken: String) {
  const user = await verifyGoogleAccount(accessToken);
  // Fetch Portfolio data from server
  const { data, imageUrl } = await fetchPortfolio(user.userName);
  setToLocalStorage("form", data);

  return {
    user,
    data,
    imageUrl,
  };
}
