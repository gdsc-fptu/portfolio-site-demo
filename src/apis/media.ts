import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";

export async function removeBackground(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return await apiHelper.postFormData(Apis.removeBackground, formData);
}

export async function getImage(path: String) {
  return await apiHelper.post(Apis.readImage, { path });
}

export async function uploadImage(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);
  return await apiHelper.postFormData(Apis.uploadImage, formData);
}

export async function deleteImage(url: string) {
  return await apiHelper.post(Apis.deleteImage, { path: url });
}
