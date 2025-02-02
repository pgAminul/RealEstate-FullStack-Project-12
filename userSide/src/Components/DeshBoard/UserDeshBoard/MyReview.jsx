import React from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosInstace from "../../Axios/useAxiosInstance";
import useAuth from "../../AuthProvider/UseAuth";

const MyReview = () => {
  const axiosSecure = useAxiosInstace();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch the reviews
  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myReviews/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Email থাকা অবস্থায় ডেটা ফেচ করবে
  });

  // Handle delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/deleteMyReview/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews"]); // ডেটা রিফ্রেশ
      Swal.fire({
        title: "Deleted!",
        text: "Your review has been successfully deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      console.error("Delete error:", error); // ডিবাগিং লজিক
      Swal.fire({
        title: "Error!",
        text: "Failed to delete review. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id); // ডিলিট মিউটেশন কল
      }
    });
  };

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div
      className={`${
        cards.length !== 4 ? "h-[80vh] flex justify-center items-center" : ""
      }`}
    >
      {cards.length === 0 ? (
        <h2 className="text-white text-4xl font-bold">
          You Didn't Add Any Review
        </h2>
      ) : (
        <div className="space-y-4 gap-4 p-4 mx-auto justify-center items-center md:grid grid-cols-2">
          {cards.map((card) => (
            <motion.div
              key={card._id}
              initial="hidden"
              animate="visible"
              className="bg-pink-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100 p-4 text-white"
            >
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="text-md my-2">Agent: {card.agentName}</p>
              <p className="text-sm">Review Date: {card.time}</p>
              <p className="my-2">Description: {card.description}</p>
              <button
                className="btn btn-error text-white"
                onClick={() => handleDelete(card._id)}
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReview;
