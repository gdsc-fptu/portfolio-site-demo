import { createPortfolio } from "../../apis/user";
import { removeFromLocalStorage } from "../../utils/utils";
import { User } from "../../utils/interface";

export default async function handleCreatePortfolio(
  user: User | null,
  userName: String
) {
  await createPortfolio(userName);
  // Clear form data in local storage
  removeFromLocalStorage("form");
  // Update user data
  user!.userName = userName;
  return user;
}
