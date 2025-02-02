import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosInstance from "../../../Axios/useaxiosInstance";
import useAuth from "../../../AuthProvider/UseAuth";
import IdWiseQuery from "../../../TanstakQuery/IdWiseQuery";
import PublicAxios from "../../../Axios/PublicAxios";
const UpdateProperties = () => {
  const [, data] = IdWiseQuery();
  const { title, image, location, priceMin, priceMax, _id } = data;

  const { user } = useAuth();
  const axiosPublic = PublicAxios();

  const imageApiKey = import.meta.env.VITE_IMAGE_API;
  const imageHosting = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
  const axiosIntance = useAxiosInstance();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const imgUploadData = new FormData();
    imgUploadData.append("image", formData.get("image"));

    axiosPublic
      .post(imageHosting, imgUploadData)
      .then((res) => {
        const imageUrl = res.data.data.url;
        const propertyData = Object.fromEntries(formData.entries());
        propertyData.image = imageUrl;

        axiosIntance
          .patch(`/Update-poperty/${_id}`, propertyData)
          .then((res) => {
            Swal.fire({
              title: "Success!",
              text: "Property Update successfully!",
              icon: "success",
              confirmButtonText: "OK",
            });

            e.target.reset();
          })
          .catch((e) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to Update property. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      })
      .catch((error) => {
        console.error("Image upload failed: ", error);

        Swal.fire({
          title: "Error!",
          text: "Image upload failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <motion.div
      className="min-w-lg mx-auto p-6 shadow-lg text-black bg-orange-400 border-white border rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-center mb-4 text-white">
        Add Property
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Property Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={title}
            className="w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Property Location
          </label>
          <input
            type="text"
            name="location"
            defaultValue={location}
            className="w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property location"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Property Image
          </label>
          <div className="relative">
            <label
              htmlFor="fileInput"
              className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700"
            >
              Choose File
            </label>
            <input
              id="fileInput"
              type="file"
              defaultValue={image}
              name="image"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Agent Name
          </label>
          <input
            type="text"
            name="agentName"
            defaultValue={user?.displayName || ""}
            readOnly
            className="w-full px-4 py-2 border-none rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Agent Email
          </label>
          <input
            type="email"
            name="agentEmail"
            defaultValue={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 border-none rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Price Range
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              defaultValue={priceMin}
              name="priceMin"
              className="w-1/2 px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min Price"
              required
            />
            <input
              type="number"
              name="priceMax"
              defaultValue={priceMax}
              className="w-1/2 px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max Price"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Property
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UpdateProperties;
