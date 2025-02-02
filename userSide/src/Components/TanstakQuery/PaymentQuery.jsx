import { useQuery } from "@tanstack/react-query";
import PublicAxios from "../Axios/PublicAxios";

const PaymentQuery = () => {
  const axiosPublic = PublicAxios();

  const {
    data: participants = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const res = await axiosPublic.get("/offerd-price-payment");
      return res.data;
    },
  });

  return [participants, loading, refetch];
};

export default PaymentQuery;
