import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../Axios/useaxiosInstance";
import useAuth from "../AuthProvider/UseAuth";

export default function EmailWiseQuery() {
  const { user } = useAuth();
  const axiosInstance = useaxiosInstance();

  const {
    data: emailData = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Email", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is undefined.");
      }
      const res = await axiosInstance.get(`/my-added-data/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { emailData, refetch, isLoading, isError };
}
