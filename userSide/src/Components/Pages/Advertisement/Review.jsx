import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Axios/useaxiosInstance";

const Review = ({ id }) => {
  const axiosSecure = useAxiosInstance();

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-5">
      {reviews.length === 1 ? (
        <div>
          {reviews.map((item) => (
            <div
              key={item.id}
              className="text-center bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <div className="flex justify-center items-center">
                <Rating style={{ maxWidth: 100 }} value={item.stars} readOnly />
              </div>
              <p className="text-lg italic text-gray-600">
                "{item.description}"
              </p>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {item.reviewerName}
              </h3>
              <p className="text-sm text-gray-500">{item.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {reviews.map((item) => (
            <div
              key={item.id}
              className="text-center bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <div className="flex justify-center items-center">
                <Rating style={{ maxWidth: 100 }} value={item.stars} readOnly />
              </div>
              <p className="text-lg italic text-gray-600">
                "{item.description}"
              </p>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {item.reviewerName}
              </h3>
              <p className="text-sm text-gray-500">{item.time}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Review;
