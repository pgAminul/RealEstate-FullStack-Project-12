import React from "react";
import useAxiosInstance from "../../Axios/useaxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function ManageReview() {
  const axiosSecure = useAxiosInstance();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axiosSecure.get("/reviewAdmin");
      return response.data;
    },
  });

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/reviewDeleteByAdmin/${id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire("Deleted!", "The review has been deleted.", "success");
            refetch(); // Update the data after successful deletion
          } else {
            Swal.fire("Error!", "Something went wrong!", "error");
          }
        });
      }
    });
  };
  return (
    <div
      className={`container mx-auto p-6 ${
        users.length < 6 ? "min-h-[80vh]" : ""
      }`}
    >
      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {users.map((user) => (
          <div
            key={user.reviewerEmail}
            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="">
              <img
                src={user.reviewerPhoto}
                alt={user.reviewerName}
                className="w-12 h-12 rounded-full border-2 border-gray-200"
              />
              <div>
                <h2 className="text-lg font-bold text-white">
                  {user.reviewerName}
                </h2>
                <p className="text-sm text-gray-300">{user.reviewerEmail}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-200">{user.description}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition duration-300"
                onClick={() => {
                  handleDelete(user._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
