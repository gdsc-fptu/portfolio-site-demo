import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type ApiResponse<T> = {
  message: string;
  data: T;
  error?: any;
};

const apiHelper = {
  addToken: (token: String) => {
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  },

  get: async <T>(url: string, params: object = {}): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get<ApiResponse<T>>(url, { params });
      return response.data;
    } catch (error: any) {
      return { error } as ApiResponse<T>;
    }
  },

  post: async <T>(
    url: string,
    data: object = {},
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post<ApiResponse<T>>(url, data, {
        ...config,
        headers: { "Content-Type": "application/json", ...config.headers },
      });
      return response.data;
    } catch (error: any) {
      return { error } as ApiResponse<T>;
    }
  },

  postFormData: async <T>(
    url: string,
    formData: FormData,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post<ApiResponse<T>>(url, formData, {
        ...config,
        headers: { "Content-Type": "multipart/form-data", ...config.headers },
      });
      return response.data;
    } catch (error: any) {
      return { error } as ApiResponse<T>;
    }
  },

  put: async <T>(
    url: string,
    data: object = {},
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.put<ApiResponse<T>>(url, data, {
        ...config,
        headers: { "Content-Type": "application/json", ...config.headers },
      });
      return response.data;
    } catch (error: any) {
      return { error } as ApiResponse<T>;
    }
  },

  delete: async <T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete<ApiResponse<T>>(url, { ...config });
      return response.data;
    } catch (error: any) {
      return { error } as ApiResponse<T>;
    }
  },
};

export default apiHelper;
