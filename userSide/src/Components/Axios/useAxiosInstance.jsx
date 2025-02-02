import { useEffect } from "react";
import axios from "axios";
import useAuth from "../AuthProvider/UseAuth";

const axiosInstance = axios.create({
  baseURL: "https://server-side-mocha-kappa.vercel.app",
  withCredentials: true,
});

export default function useAxiosInstance() {
  const { logOut } = useAuth() || {};

  useEffect(() => {
    // Request interceptor
    axiosInstance.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Response interceptor (optional)
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          // Unauthorized access, logging out the user
          await logOut();
        }
        return Promise.reject(error);
      }
    );
  }, [logOut]);

  return axiosInstance;
}
