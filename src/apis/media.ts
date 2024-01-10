import apiHelper from "../utils/apiHelper";
import { Apis } from "../utils/constant";
import { infoLogger } from "../utils/utils";

export async function removeBackground(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiHelper.postFormData(
    Apis.removeBackground,
    formData
  );
  infoLogger(response.message, "removeBackground");
  return response.data;
}

export async function getImage(path: String) {
  const response = await apiHelper.post(Apis.readImage, { path });
  infoLogger(response.message, "getImage");
  return response.data;
}

export async function uploadImage(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiHelper.postFormData(Apis.uploadImage, formData);
  infoLogger(response.message, "uploadImage");
  return response.data;
}

export async function deleteImage(url: String) {
  const response = await apiHelper.post(Apis.deleteImage, { path: url });
  infoLogger(response.message, "deleteImage");
  return response.data;
}
