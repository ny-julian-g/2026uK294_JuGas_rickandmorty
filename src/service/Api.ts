import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3030";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    const isLoginPath = config.url === "/login" || config.url === "login";

    if (token && !isLoginPath) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);