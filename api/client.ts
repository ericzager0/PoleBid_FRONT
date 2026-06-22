import { create } from "axios";
import { authStorage } from "./auth";

const client = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

client.interceptors.request.use(async (config) => {
  const token = await authStorage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      await authStorage.removeToken();
      // aca deberiamos redirigir al login usando el router
    }
    const data = error.response?.data;
    const message =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : null) ||
      error.message ||
      "Error inesperado";
    return Promise.reject(new Error(message));
  },
);

export default client as any;
