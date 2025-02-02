import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../Axios/useaxiosInstance";
import useAuth from "../../AuthProvider/UseAuth";
import { data, NavLink } from "react-router-dom";

const PropertyBought = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();
  const [bought, setBought] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`/my-bought/${user?.email}`)
      .then((res) => setBought(res.data))
      .catch((error) => console.error(error.message));
  }, [axiosInstance, user]);
  return (
    <div
      className={`overflow-x-auto ${bought.length < 7 ? "min-h-screen" : ""}`}
    >
      <table className="table text-white">
        {/* head */}
        <thead>
          <tr className="text-white">
            <th>image</th>
            <th>Agent Name</th>
            <th>Offered Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {bought.map((buy, i) => {
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
                  <h2>{buy.agentName}</h2>
                </td>
                <td>
                  <h2>$ {buy.offerAmount}</h2>
                </td>
                <td>
                  <h2>{buy.status}</h2>
                </td>
                <th>
                  {buy.status === "accepted" && (
                    <NavLink
                      to={`/deshboard/user/payment/${buy._id}`}
                      className="btn btn-success text-white"
                    >
                      Pay
                    </NavLink>
                  )}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyBought;
