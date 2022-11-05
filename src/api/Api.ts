import axios from "axios";
import router from "@/router";

export const backendAPIURL = "/api/v2";

export default () => {

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const Api = axios.create({
    baseURL: backendAPIURL,
    withCredentials: true,
    headers,
  });

  Api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        router.push({ name: "SigninView" });
      }

      return Promise.reject(error);
    }
  );

  return Api;
};
