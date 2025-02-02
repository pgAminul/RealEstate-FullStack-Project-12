import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../Axios/useaxiosInstance";
import Swal from "sweetalert2";

export default function Advertiseproperty() {
  const [AllProperty, setAllProperty] = useState([]);
  const axiosSecure = useAxiosInstance();
  useEffect(() => {
    axiosSecure.get("/adverties").then((res) => setAllProperty(res.data));
  }, []);

  const handleAdvertise = (id) => {
    axiosSecure.patch(`/adverties-poperty/${id}`).then((res) => {
      if (res.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Property advertised successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Update the UI
        setAllProperty((prev) =>
          prev.map((property) =>
            property._id === id
              ? { ...property, advertisement: "yes" }
              : property
          )
        );
      } else {
        Swal.fire({
          title: "Success!",
          text: "Property advertised successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div
      className={`overflow-x-auto ${
        AllProperty.length < 7 ? "min-h-screen" : ""
      }`}
    >
      <table className="table text-white">
        <thead>
          <tr className="text-white">
            <th>Image</th>
            <th>Agent Name</th>
            <th>Agent Email</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {AllProperty.length > 0 ? (
            AllProperty.map((buy, i) => (
              <tr key={i}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={buy.image} alt="Property" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{buy.title}</div>
                      <div className="text-sm opacity-50">{buy.location}</div>
                    </div>
                  </div>
                </td>
                <td>{buy.agentName}</td>
                <td>{buy.agentEmail}</td>
                <td>
                  ${buy.priceMin} - ${buy.priceMax}
                </td>
                <td className="lg:flex gap-2 mt-3">
                  {buy.advertisement === "yes" ? (
                    <button className="btn btn-disabled text-white">
                      Added
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAdvertise(buy._id)}
                    >
                      Advertise
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
