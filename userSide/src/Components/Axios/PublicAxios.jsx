import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server-side-mocha-kappa.vercel.app",
});

export default function PublicAxios() {
  return axiosPublic;
}
