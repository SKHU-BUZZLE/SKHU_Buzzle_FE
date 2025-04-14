import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const logout = useAuthStore.getState().logout;

    if (error.response?.status === 401) {
      logout(); // 인증 실패
    }

    if (error.response?.status === 500) {
      logout();
    }

    return Promise.reject(error);
  }
);
