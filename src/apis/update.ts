import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { User } from "../utils/interface";

export const updatePost = async (id: String, data: User) => {
  await apiHelper.put(Apis.update + id, data);
};
