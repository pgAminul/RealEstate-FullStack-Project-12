import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../Axios/useaxiosInstance";
import useAuth from "../AuthProvider/UseAuth";

export default function RequestedQuery() {
  const { user } = useAuth();
  const axiosInstance = useaxiosInstance();

  const {
    data: Requested = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Email", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is undefined.");
      }
      const res = await axiosInstance.get(`/requested-property/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { Requested, refetch, isLoading, isError };
}
