import React, { useState, useEffect } from "react";
import useAuth from "../../AuthProvider/UseAuth";
import { useParams } from "react-router-dom";
import useAxiosInstance from "../../Axios/useaxiosInstance";
import Swal from "sweetalert2";

export default function ReviewModal({ data }) {
  const [reviewDescription, setReviewDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [reviewTime, setReviewTime] = useState("");
  const { id } = useParams();
  const axiosSecure = useAxiosInstance();
  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleString();
    setReviewTime(formattedTime);
  }, []);

  const handleStarClick = (rating) => {
    setStarRating(rating);
  };
  const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      previosId: id,
      agentEmail: data.agentEmail,
      agentName: data.agentName,
      time: reviewTime,
      title: data.title,
      propertyImg: data.propertyImage,
      description: reviewDescription,
      stars: starRating,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      reviewerPhoto: user.photoURL,
    };
    try {
      axiosSecure.post("/review", reviewData).then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Review successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to Delete property. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    document.getElementById("my_modal_3").close();
  };

  return (
    <div>
      <button onClick={() => document.getElementById("my_modal_3").showModal()}>
        Review
      </button>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <button
            onClick={() => document.getElementById("my_modal_3").close()}
            className="btn btn-sm btn-circle btn-red absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Submit Your Review</h3>

          <form onSubmit={handleSubmit}>
            <p className="block mb-2 font-semibold">
              <span className="text-gray-600">Review Time:</span>{" "}
              <span className="text-blue-600">{reviewTime}</span>
            </p>

            <label className="block mb-2 font-semibold">
              Review Description:
              <textarea
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
                className="textarea textarea-bordered text-black w-full mt-1"
                placeholder="Write your review here..."
                required
              ></textarea>
            </label>

            <label className="block mb-2 font-semibold">
              Star Rating:
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`cursor-pointer text-2xl ${
                      star <= starRating ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </label>

            <button
              type="submit"
              className="btn btn-success text-white mt-4 w-full"
            >
              Submit Review
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
