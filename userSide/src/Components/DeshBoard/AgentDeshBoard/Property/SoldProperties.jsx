import React, { useEffect, useState } from "react";
import useAuth from "../../../AuthProvider/UseAuth";
import useAxiosInstance from "../../../Axios/useAxiosInstance";

export default function SoldProperties() {
  const [Sold, setSold] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosInstance();
  useEffect(() => {
    axiosSecure.get(`/my-sold-property/${user?.email}`).then((res) => {
      const reversedData = res.data.slice().reverse();
      setSold(reversedData);
    });
  }, [axiosSecure, user?.email]);

  const [payment, setPayment] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  useEffect(() => {
    axiosSecure.get(`/PaymentHistory/${user.email}`).then((res) => {
      setPayment(res.data);
    });
  }, [axiosSecure, user.email]);

  useEffect(() => {
    const total = payment.reduce((acc, pay) => acc + pay.payment, 0);
    setTotalPayment(total);
  }, [payment]);

  return (
    <div>
      <div className="flex justify-center items-center ">
        <h2 className="text-white text-2xl border-y-yellow-600 p-4 border-y font-bold my-4 uppercase">
          Amount Of Total Solded Properties: ${totalPayment}
        </h2>
      </div>

      {Sold.length === 0 ? (
        <h2 className="text-white text-4xl min-h-screen font-bold">
          You Didn't Sell Any Property
        </h2>
      ) : (
        <div className={`overflow-x-auto `}>
          <table className="table text-white">
            {/* head */}
            <thead>
              <tr className="text-white">
                <th>No</th>
                <th>image</th>
                <th>Buyer Emai</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {Sold.map((Sold, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={Sold.img}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{Sold.title}</div>
                          <div className="text-sm opacity-50">
                            {Sold.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <h2>{Sold.email}</h2>
                    </td>
                    <td>
                      <h2>$ {Sold.payment}</h2>
                    </td>
                    <td>
                      <h2>{Sold.status}</h2>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
