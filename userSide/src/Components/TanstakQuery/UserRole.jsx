import { useQuery } from "@tanstack/react-query";
import PublicAxios from "../Axios/PublicAxios";
import useAuth from "../AuthProvider/UseAuth";
import useAxiosInstance from "../Axios/useaxiosInstance";

export default function UserRole() {
  const axiosIntance = useAxiosInstance();
  const { user } = useAuth();
  const { refetch, data: userRole = [] } = useQuery({
    queryKey: ["Role"],
    queryFn: async () => {
      const res = await axiosIntance.get(`/getRole/${user?.email}`);
      return res.data;
    },
  });
  return [refetch, userRole];
}
