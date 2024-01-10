import { getImage } from "../../apis/media";
import { getPortfolio } from "../../apis/read";

export async function fetchPortfolio(userName: String) {
  let data = null;
  let imageUrl = null;
  const portfolioData = await getPortfolio(userName, true, false);
  if (portfolioData) {
    data = portfolioData;
  }
  if (data?.imageUrl) {
    imageUrl = (await getImage(data.imageUrl)) as String;
  }
  return { data, imageUrl };
}

export async function fetchPortfolioImage(imageUrl: String | null) {
  if (!imageUrl) return null;
  const image = (await getImage(imageUrl)) as String;
  return image;
}
