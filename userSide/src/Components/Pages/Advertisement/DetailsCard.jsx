import React from "react";
import useAuth from "../../AuthProvider/UseAuth";
import useAxiosInstance from "../../Axios/useaxiosInstance";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import Review from "./Review";

export default function DetailsCard({
  propertyImage,
  title,
  location,
  agentName,
  agentImg,
  agentEmail,
  verified,
  Minprice,
  MaxPrice,
}) {
  const { id } = useParams();
  const { user } = useAuth();
  const AddWishListBy = user?.email;
  const data = {
    propertyImage: propertyImage,
    title: title,
    location: location,
    agentName: agentName,
    agentImg: agentImg,
    verified: verified,
    Minprice: Minprice,
    MaxPrice: MaxPrice,
    agentEmail: agentEmail,
    AddWishListBy: AddWishListBy,
  };
  const axiosInstance = useAxiosInstance();
  const handleWishList = () => {
    try {
      axiosInstance.post(`/added-to-my-wishList`, data).then((res) => {
        Swal.fire({
          title: "Success!",
          text: "WishList added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed  add property to Wish List. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <div
        className="bg-pink-900 rounded-md bg-clip-padding backdrop-filter max-w-5xl p-5
      mx-auto backdrop-blur bg-opacity-10 border border-gray-200 shadow-lg"
      >
        {/* Property Image */}
        <img
          src={propertyImage}
          alt={title}
          className="w-full  object-cover rounded-md"
        />

        {/* Property Details */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-yellow-500 text-md">{location}</p>
          <p className="text-sm text-green-400">Status: {verified}</p>
        </div>
        <div className="flex items-center gap-3 mt-4">
          {" "}
          <span className="text-sm font-bold text-white">Price:</span>
          <p className="text-sm font-semibold text-white">${Minprice}</p>
          <p className="text-sm font-semibold text-white">${MaxPrice}</p>
        </div>
        {/* Agent Info */}
        <div className="flex items-center gap-4 my-4">
          <img
            src={agentImg || "not provide"}
            alt={agentName}
            className="w-12 h-12 rounded-full border-2 border-gray-200"
          />
          <div className="">
            <p className="text-sm font-medium text-white">{agentName}</p>
          </div>
        </div>

        {/* Price and Wishlist Button */}

        <div className="flex justify-between items-center">
          <button onClick={handleWishList} className="btn btn-primary">
            Add to Wishlist
          </button>

          <button className="btn btn-success text-white">
            <ReviewModal data={data} />
          </button>
        </div>
      </div>

      <div>
        <Review id={id} />
      </div>
    </div>
  );
}
