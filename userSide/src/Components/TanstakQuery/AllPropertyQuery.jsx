import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../Axios/useaxiosInstance";

export default function AllPropertyQuery() {
  const axiosInstance = useaxiosInstance();
  const { refetch, AllProperty = [] } = useQuery({
    queryKey: ["AllProperty"],
    queryFn: async () => {
      const res = await axiosInstance.get("/alldata");
      return res.data;
    },
  });
  return [refetch, AllProperty];
}
