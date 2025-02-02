import React from "react";
import Title from "../../ReusableCompnents/Title";
import PropertyCard from "./PropertyCard";
import { useQuery } from "@tanstack/react-query";
import PublicAxios from "../../Axios/PublicAxios";

export default function Advertisement() {
  const axiosPublic = PublicAxios();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axiosPublic.get("/addPropertyByAdmin");
      return response.data;
    },
  });
  return (
    <div>
      <Title
        title={"Advertisement"}
        description={"Find Your Perfect Match Here"}
      />
      <div className="grid md:grid-cols-2 justify-center items-center lg:grid-cols-3">
        {users.slice(0, 6).map((d) => (
          <PropertyCard property={d} />
        ))}
      </div>
    </div>
  );
}
