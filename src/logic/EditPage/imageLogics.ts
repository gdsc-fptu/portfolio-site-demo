import { deleteImage, removeBackground, uploadImage } from "../../apis/media";
import { updatePortfolio } from "../../apis/update";
import { downloadImage } from "../../utils/utils";
import { Portfolio } from "../../utils/interface";

export async function uploadImageLogic(
  form: Portfolio,
  file: File,
  isRembg: Boolean
) {
  // Resize image
  if (isRembg) {
    const data = (await removeBackground(file)) as any;
    file = await downloadImage(data.image);
  }
  // Upload image
  const uploadImageResponse = await uploadImage(file);
  // Update Portfolio
  await updatePortfolio(form.id, {
    ...form,
    imageUrl: uploadImageResponse.imagePath,
  });

  return {
    imagePath: uploadImageResponse.fullPath as String,
    imageUrl: uploadImageResponse.imageUrl as String,
  };
}

export async function deleteImageLogic(form: Portfolio) {
  // Delete image
  await deleteImage(form.imageUrl);
  // Update Portfolio
  await updatePortfolio(form.id, {
    ...form,
    imageUrl: "",
  });
}
