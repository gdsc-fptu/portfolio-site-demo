import { removeBackground, uploadImage } from "../apis/media";
import { downloadImage } from "../utils/utils";

export async function processUploadImage(file: File, isRembg: Boolean) {
  // Resize image
  if (isRembg) {
    const data = (await removeBackground(file)) as any;
    file = await downloadImage(data.image);
  }
  // Upload image
  const response = await uploadImage(file);
  return {
    imagePath: response.fullPath as String,
    imageUrl: response.imageUrl as String,
  };
}
