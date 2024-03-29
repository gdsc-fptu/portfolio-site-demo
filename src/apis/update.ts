import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { detectError, infoLogger } from "../utils/utils";
import { Portfolio } from "../utils/interface";

export const updatePortfolio = async (id: String, data: Portfolio) => {
  const response = await apiHelper.put(Apis.update + id, data);
  infoLogger(response.message, "updatePortfolio");
  // Check error during update
  detectError(response.error);
};
