import { useQuery } from "@tanstack/react-query";
import useAuth from "../AuthProvider/UseAuth";
import PublicAxios from "../Axios/PublicAxios";
export default function WishListQuery() {
  const { user } = useAuth();
  const axiosInstance = PublicAxios();

  const {
    data: WishListData = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["datas", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosInstance.get(`/my-wishList/${user.email}`);
      return res.data || [];
    },

    enabled: !!user?.email,
  });

  return [WishListData, refetch, isLoading, isError];
}
