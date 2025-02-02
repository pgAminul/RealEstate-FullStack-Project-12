import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../Axios/useaxiosInstance";
import { useParams } from "react-router-dom";

export default function IdWiseQuery() {
  const { id } = useParams();
  const axiosInstance = useaxiosInstance();
  const { refetch, data = [] } = useQuery({
    queryKey: ["card"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/property-detail/${id}`);
      return res.data;
    },
  });
  return [refetch, data];
}
