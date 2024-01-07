import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";

export async function removeBackground(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiHelper.postFormData(
    Apis.removeBackground,
    formData
  );
  console.info(response.message);
  return response.data;
}

export async function getImage(path: String) {
  const response = await apiHelper.post(Apis.readImage, { path });
  console.info(response.message);
  return response.data;
}

export async function uploadImage(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiHelper.postFormData(Apis.uploadImage, formData);
  console.info(response.message);
  return response.data;
}

export async function deleteImage(url: string) {
  const response = await apiHelper.post(Apis.deleteImage, { path: url });
  console.info(response.message);
  return response.data;
}
