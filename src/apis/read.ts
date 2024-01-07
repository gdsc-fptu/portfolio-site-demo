import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { User } from "../utils/interface";

export const getPosts = async (role?: String | null) => {
  let params = {};
  if (role) {
    params = { roles: role };
  }
  const response = await apiHelper.get(Apis.getAll, params);
  console.info(response.message);
  return response.data as User[];
};

export const getPost = async (
  id: String,
  withUserName: Boolean = true,
  parseImg: Boolean = true
) => {
  let params = {};
  if (withUserName) {
    params = { uname: 1, parseimg: parseImg ? 1 : 0 };
  }
  const response = await apiHelper.get(Apis.getOne + id, params);
  console.info(response.message);
  return response.data as User;
};
