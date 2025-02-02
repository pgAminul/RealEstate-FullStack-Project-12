import React from "react";
import WishListQuery from "../../TanstakQuery/WishListQuery";
import { NavLink } from "react-router-dom";
import useAxiosInstance from "../../Axios/useaxiosInstance";
import Swal from "sweetalert2";

const WishList = () => {
  const [WishListData, refetch, isLoading, isError] = WishListQuery();
  const axiosInstance = useAxiosInstance();

  const handleDelete = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion if confirmed
        axiosInstance
          .delete(`/my-wishList-delete/${id}`)
          .then((response) => {
            Swal.fire(
              "Deleted!",
              "The item has been removed from your wishlist.",
              "success"
            );
            refetch(); // Refresh the wishlist data
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error!",
              "Something went wrong while deleting the item.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div>
      {WishListData.length === 0 ? (
        <div className="flex justify-center items-center h-[80vh] text-white text-4xl">
          <h2>You Didn't Add Any Property in the Wish List</h2>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-4">
          {WishListData.map((wish) => {
            const {
              propertyImage,
              title,
              location,
              agentName,
              agentImg,
              verified,
              Minprice,
              MaxPrice,
              _id,
            } = wish;

            return (
              <div
                key={wish.id}
                className="relative bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out mb-6"
              >
                <div className="h-48 bg-gray-300">
                  <img
                    src={propertyImage}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                  <p className="text-sm text-gray-500">{location}</p>
                  <div className="flex items-center mt-3">
                    <img
                      src={agentImg}
                      alt={agentName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">
                        {agentName}
                      </p>
                      <p className="text-xs text-green-500">
                        {verified ? "Verified Agent" : "Not Verified"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-gray-800">
                      ${Minprice} - ${MaxPrice}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <NavLink
                      className="btn btn-success"
                      to={`/deshboard/user/Offer/${_id}`}
                    >
                      Make an Offer
                    </NavLink>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDelete(_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishList;
