import { NavLink } from "react-router-dom";
import EmailWiseQuery from "../../../TanstakQuery/EmailWiseQuery";
import Swal from "sweetalert2";
import useAxiosInstance from "../../../Axios/useAxiosInstance";

export default function MyAddedProperty() {
  const { emailData, refetch, isLoading, isError } = EmailWiseQuery();
  const axiosSecure = useAxiosInstance();

  if (isLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center ">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500">Failed to fetch properties. Try again.</p>
    );
  }

  if (!emailData || emailData.length === 0) {
    return (
      <p className="text-white flex justify-center items-center min-h-screen font-4sl ">
        No properties available.
      </p>
    );
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/property-delete/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your property has been deleted.",
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete property. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        title: "Cancelled",
        text: "Your property is safe.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-purple-950 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {emailData.map((property) => (
        <div
          key={property._id}
          className="bg-pink-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-gray-200 shadow-lg"
        >
          <img
            src={property.image}
            alt="Property"
            className="w-full h-56 object-cover rounded-t-md"
          />
          <div className="p-4">
            <p className="mb-4 text-yellow-400">
              Location: {property.location}
            </p>
            <p className="mb-4 text-white">
              Price Range: ${property.priceMin} - ${property.priceMax}
            </p>
            <p
              className={`font-medium ${
                property.verificationStatus === "Verified"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Verification Status: {property.verificationStatus}
            </p>
            <div className="mt-3 flex justify-between">
              <NavLink
                to={`/deshboard/agent/Update-details/${property._id}`}
                className="btn btn-secondary "
              >
                Update
              </NavLink>
              <button
                onClick={() => handleDelete(property._id)}
                className="btn btn-error text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
