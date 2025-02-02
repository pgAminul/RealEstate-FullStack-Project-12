import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({
  image,
  location,
  priceMin,
  priceMax,
  verificationStatus,
  _id,
}) => {
  return (
    <div className="  bg-pink-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-gray-200 shadow-lg">
      {/* Image */}
      <img src={image} alt="Property" className="w-full h-56 object-cover" />

      {/* Card Content */}
      <div className="p-4">
        <p className="mb-4 text-yellow-400">Location: {location}</p>
        <p className="mb-4 text-white">
          Price Range ${priceMin} - ${priceMax}
        </p>
        <p
          className={`font-medium ${
            verificationStatus === "Verified"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          Verification Status: {verificationStatus}
        </p>

        {/* Details Button */}
        <NavLink
          to={`/property-details/${_id}`}
          className="mt-4 w-full  btn btn-primary text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default Card;
