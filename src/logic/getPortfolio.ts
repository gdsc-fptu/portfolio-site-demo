import { getImage } from "../apis/media";
import { getPost } from "../apis/read";

export async function fetchPortfolioData(userName: String) {
  let data = null;
  let imageUrl = null;
  const portfolioData = await getPost(userName, true, false);
  if (portfolioData) {
    data = portfolioData;
  }
  if (data?.imageUrl) {
    imageUrl = (await getImage(data.imageUrl)) as String;
  }
  return { data, imageUrl };
}
