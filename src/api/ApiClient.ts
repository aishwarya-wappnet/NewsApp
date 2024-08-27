import axios from "axios";

const ApiClient = axios.create();

ApiClient.interceptors.request.use(
  (config) => {
    config.baseURL = import.meta.env.VITE_APP_BACKEND_URL;
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

export default ApiClient;
