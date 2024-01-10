import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { infoLogger } from "../utils/utils";
import { Portfolio } from "../utils/interface";

export const getPortfolios = async (role?: String | null) => {
  let params = {};
  if (role) {
    params = { roles: role };
  }
  const response = await apiHelper.get(Apis.getAll, params);
  infoLogger(response.message, "getPortfolios");
  return response.data as Portfolio[];
};

export const getPortfolio = async (
  id: String,
  withUserName: Boolean = true,
  parseImg: Boolean = true
) => {
  let params = {};
  if (withUserName) {
    params = { uname: 1, parseimg: parseImg ? 1 : 0 };
  }
  const response = await apiHelper.get(Apis.getOne + id, params);
  infoLogger(response.message, "getPortfolio");
  return response.data as Portfolio;
};
