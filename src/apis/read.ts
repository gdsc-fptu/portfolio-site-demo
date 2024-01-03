import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { User } from "../utils/interface";

export const getPosts = async (role?: string) => {
  let params = {};
  if (role) {
    params = { roles: role };
  }
  const response = await apiHelper.get(Apis.getAll, params);
  return response as User[];
};

export const getPost = async (
  id: string,
  withUserName: boolean = true,
  parseImg: boolean = true
) => {
  let params = {};
  if (withUserName) {
    params = { uname: 1, parseimg: parseImg ? 1 : 0 };
  }
  const response = await apiHelper.get(Apis.getOne + id, params);
  return response as User;
};
