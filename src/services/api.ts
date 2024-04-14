import axios from "axios";
import { get } from "../utils/storage";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000,
});

api.interceptors.request.use(
  async function (config) {
    const userStore = await get("user-store");
    if (userStore) {
      const storeJson = JSON.parse(userStore);
      const token = storeJson["state"]["token"];
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
