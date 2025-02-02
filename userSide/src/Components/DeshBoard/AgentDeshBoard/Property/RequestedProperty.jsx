import React, { useEffect, useState } from "react";
import RequestedQuery from "../../../TanstakQuery/RequestedQuery";
import useAxiosInstance from "../../../Axios/useaxiosInstance";

const RequestedProerty = () => {
  const axiosInstance = useAxiosInstance();

  const { Requested, refetch, isLoading, isError } = RequestedQuery();
  refetch();

  if (isLoading)
    return (
      <div className="h-[80vh] flex justify-center items-center ">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  const handleAccept = (id) => {
    axiosInstance.patch(`/offer-accepted/${id}`);
    refetch();
  };
  const handleReject = (id) => {
    axiosInstance.patch(`/offers-reject/${id}`);
    refetch();
  };
  return (
    <div
      className={`overflow-x-auto ${
        Requested.length < 7 ? "min-h-screen" : ""
      }`}
    >
      <table className="table text-white">
        {/* head */}
        <thead>
          <tr className="text-white">
            <th>image</th>
            <th>Buyer Name</th>
            <th>Buyer Email</th>
            <th>Offered Price</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {Requested.map((buy, i) => {
            return (
              <tr key={i}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={buy.propertyImg}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{buy.title}</div>
                      <div className="text-sm opacity-50">{buy.location}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <h2>{buy.buyerName}</h2>
                </td>
                <td>
                  <h2>{buy.buyerEmail}</h2>
                </td>
                <td>
                  <h2>$ {buy.offerAmount}</h2>
                </td>

                <td className="lg:flex gap-2 mt-3">
                  {buy.status === "pandding" ? (
                    <>
                      <button
                        onClick={() => handleAccept(buy._id)}
                        className="btn btn-xs lg:mb-0 mb-3 btn-primary text-white"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(buy._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        {buy.status === "rejected" ? (
                          <span className="text-yellow-300">{buy.status}</span>
                        ) : (
                          <span className="text-green-400">{buy.status}</span>
                        )}
                      </div>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedProerty;
