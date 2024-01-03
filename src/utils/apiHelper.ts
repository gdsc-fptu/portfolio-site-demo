import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface ApiResponse<T> {
  message: string;
  data: T;
}

const apiHelper = {
  get: async <T>(url: string, params: object = {}): Promise<T> => {
    try {
      const response = await api.get<ApiResponse<T>>(url, { params });
      return response.data.data;
    } catch (error: any) {
      console.error(error.response ? error.response.message : error.message);
      return null as T;
    }
  },

  post: async <T>(
    url: string,
    data: object = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const response = await api.post<ApiResponse<T>>(url, data, {
        ...config,
        headers: { "Content-Type": "application/json", ...config.headers },
      });
      return response.data.data;
    } catch (error: any) {
      console.error(error.response ? error.response.message : error.message);
      return null as T;
    }
  },

  postFormData: async <T>(
    url: string,
    formData: FormData,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const response = await api.post<ApiResponse<T>>(url, formData, {
        ...config,
        headers: { "Content-Type": "multipart/form-data", ...config.headers },
      });
      return response.data.data;
    } catch (error: any) {
      console.error(error.response ? error.response.message : error.message);
      return null as T;
    }
  },

  put: async <T>(
    url: string,
    data: object = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const response = await api.put<ApiResponse<T>>(url, data, {
        ...config,
        headers: { "Content-Type": "application/json", ...config.headers },
      });
      return response.data.data;
    } catch (error: any) {
      console.error(error.response ? error.response.message : error.message);
      return null as T;
    }
  },

  delete: async <T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const response = await api.delete<ApiResponse<T>>(url, { ...config });
      return response.data.data;
    } catch (error: any) {
      console.error(error.response ? error.response.message : error.message);
      return null as T;
    }
  },
};

export default apiHelper;
