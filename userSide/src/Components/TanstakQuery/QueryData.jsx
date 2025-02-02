import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../Axios/useaxiosInstance";

export default function QueryData() {
  const axiosInstance = useaxiosInstance();
  const { refetch, data = [] } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosInstance.get("/property");
      return res.data;
    },
  });
  return [refetch, data];
}
