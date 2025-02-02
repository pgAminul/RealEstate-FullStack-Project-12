import React from "react";
import Rating from "react-rating";
import PublicAxios from "../../Axios/PublicAxios";
import { useQuery } from "@tanstack/react-query";

const ReviewCard = () => {
  const axiosPublic = PublicAxios();

  const { data: rev = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axiosPublic.get("/homeReview");
      return response.data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {rev.map((review, index) => {
        return (
          <div
            key={index}
            className="bg-indigo-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <div>
              <Rating
                readonly
                initialRating={review.stars}
                emptySymbol={<span className="text-gray-500 text-lg">★</span>}
                fullSymbol={<span className="text-yellow-400 text-lg">★</span>}
                className="mb-4"
              />
              <p className="mb-4">{review.description}</p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <img
                src={review.reviewerPhoto}
                alt={review.name}
                className="w-12 h-12 border rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold">{review.reviewerName}</h4>
                <p className="text-sm text-gray-400">{review.role}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewCard;
