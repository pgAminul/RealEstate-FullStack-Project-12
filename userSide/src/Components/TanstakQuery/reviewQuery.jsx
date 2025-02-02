import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../Axios/useaxiosInstance";
import { useParams } from "react-router-dom";

export default function ReviewQuery() {
  const { id } = useParams();
  const axiosInstance = useaxiosInstance();
  const { refetch, review = [] } = useQuery({
    queryKey: ["card"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews/${id}`);
      return res.data;
    },
  });
  return [refetch, review];
}
