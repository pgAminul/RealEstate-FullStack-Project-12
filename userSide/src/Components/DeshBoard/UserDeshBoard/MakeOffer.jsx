import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../Axios/useaxiosInstance";
import { useParams } from "react-router-dom";
import useAuth from "../../AuthProvider/UseAuth";
import Swal from "sweetalert2"; // Import SweetAlert

export default function MakeOffer() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const status = "pandding";
  useEffect(() => {
    axiosInstance.get(`OfferPrice/${id}`).then((res) => setData(res.data));
  }, [axiosInstance, id]);
  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);

    const datas = {
      ...formObject,
      offerAmount: parseFloat(formObject.offerAmount),
      previousId: id,
      propertyImg: data.propertyImage,
      status: status,
      agentEmail: data.agentEmail,
    };

    axiosInstance
      .post("/offeredPrice", datas)
      .then((response) => {
        // Success message using SweetAlert
        Swal.fire({
          title: "Offer Submitted",
          text: "Your offer has been successfully submitted.",
          icon: "success",
          confirmButtonText: "OK",
        });
        event.target.reset();
      })
      .catch((error) => {
        // Error message using SweetAlert
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white my-6 text-center">
        Property Offer Form
      </h2>
      <div className="flex justify-center items-center">
        <form
          id="propertyOfferForm"
          className="bg-red-400 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 p-8 rounded-lg shadow-lg w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Property Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              readOnly
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3 px-4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-white"
            >
              Property Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={data.location}
              readOnly
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3 px-4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="agentName"
              className="block text-sm font-medium text-white"
            >
              Agent Name:
            </label>
            <input
              type="text"
              id="agentName"
              name="agentName"
              value={data.agentName}
              readOnly
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3 px-4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="offerAmount"
              className="block text-sm font-medium text-white"
            >
              Offer Amount (in $):
            </label>
            <input
              type="number"
              id="offerAmount"
              name="offerAmount"
              min={data.Minprice}
              max={data.MaxPrice}
              required
              placeholder="Enter your offer"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3 px-4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="buyerEmail"
              className="block text-sm font-medium text-white"
            >
              Buyer Email:
            </label>
            <input
              type="email"
              id="buyerEmail"
              name="buyerEmail"
              value={user?.email}
              readOnly
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3 px-4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="buyerName"
              className="block text-sm font-medium text-white"
            >
              Buyer Name:
            </label>
            <input
              type="text"
              id="buyerName"
              name="buyerName"
              value={user?.displayName}
              readOnly
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3 px-4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="buyingDate"
              className="block text-sm font-medium text-white"
            >
              Buying Date:
            </label>
            <input
              type="date"
              id="buyingDate"
              name="buyingDate"
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3 px-4"
            />
          </div>

          <button
            type="submit"
            id="offerButton"
            className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Submit Offer
          </button>
        </form>
      </div>
    </div>
  );
}
