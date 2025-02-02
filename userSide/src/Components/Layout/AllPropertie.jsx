import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import QueryData from "../TanstakQuery/QueryData";

const AllPropertie = () => {
  const [, data] = QueryData();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState(""); // State for sorting option

  if (!data || data.length === 0) {
    return <p className="text-white">No properties available.</p>;
  }

  // Filter properties based on location and price range
  const filteredData = data.filter((property) => {
    const matchesLocation = property.location
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      (!minPrice || property.priceMin >= Number(minPrice)) &&
      (!maxPrice || property.priceMax <= Number(maxPrice));

    return matchesLocation && matchesPrice;
  });

  // Sort properties based on the selected option
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === "minPriceAsc") {
      return a.priceMin - b.priceMin;
    } else if (sortOption === "minPriceDesc") {
      return b.priceMin - a.priceMin;
    } else if (sortOption === "maxPriceAsc") {
      return a.priceMax - b.priceMax;
    } else if (sortOption === "maxPriceDesc") {
      return b.priceMax - a.priceMax;
    }
    return 0; // Default (no sorting)
  });

  return (
    <div className="bg-purple-950 p-4">
      {/* Search Filters */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by location..."
          className="p-2 w-full rounded-md border border-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          className="p-2 w-full rounded-md border border-gray-300"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="p-2 w-full rounded-md border border-gray-300"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {/* Sorting Dropdown */}
        <select
          className="p-2 w-full rounded-md border bg-black text-white border-gray-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="minPriceAsc">Min Price (Low to High)</option>
          <option value="minPriceDesc">Min Price (High to Low)</option>
          <option value="maxPriceAsc">Max Price (Low to High)</option>
          <option value="maxPriceDesc">Max Price (High to Low)</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedData.length > 0 ? (
          sortedData.map((property) => {
            const {
              image,
              location,
              priceMin,
              priceMax,
              verificationStatus,
              _id,
              agentImg,
              agentName,
            } = property;

            return (
              <div
                key={_id}
                className="bg-pink-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-gray-200 shadow-lg"
              >
                {/* Image */}
                <img
                  src={image}
                  alt="Property"
                  className="w-full h-56 object-cover rounded-t-md"
                />

                {/* Card Content */}
                <div className="p-4">
                  <p className="mb-4 text-yellow-400">Location: {location}</p>
                  <p className="mb-4 text-white">
                    Price Range: ${priceMin} - ${priceMax}
                  </p>
                  <p
                    className={`font-medium ${
                      verificationStatus === "Verify"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Verification Status: {verificationStatus}
                  </p>

                  <div className="flex gap-3 my-2 items-center">
                    <img
                      src={agentImg}
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                    <h2 className="text-white">{agentName}</h2>
                  </div>

                  {/* Details Button */}
                  <div className="mt-3">
                    <NavLink
                      to={`/property-details/${_id}`}
                      className="btn btn-primary w-full"
                    >
                      View Details
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-white">No properties match your search.</p>
        )}
      </div>
    </div>
  );
};

export default AllPropertie;
// <DetailsCard
//       propertyImage={data.image}
//       title={data.title}
//       location={data.location}
//       agentName={data.agentName}
//       agentImg={data.agentImg}
//       agentEmail={data.agentEmail}
//       verified={data.verificationStatus}
//       Minprice={data.priceMin}
//       MaxPrice={data.priceMax}
//     />
