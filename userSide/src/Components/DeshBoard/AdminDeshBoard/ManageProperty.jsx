import { useEffect, useState } from "react";
import useAxiosInstance from "../../Axios/useaxiosInstance";
const ManagePropery = () => {
  const axiosInstance = useAxiosInstance();
  const [AllProperty, setAllProperty] = useState([]);
  useEffect(() => {
    axiosInstance.get("/alldata").then((res) => {
      const reversedData = res.data.reverse();
      setAllProperty(reversedData);
    });
  }, []);

  const handleAccept = async (id) => {
    await axiosInstance.patch(`/verify/${id}`);
    window.location.reload();

    refetch();
  };

  const handleReject = async (id) => {
    await axiosInstance.patch(`/reject-verify/${id}`);
    window.location.reload();

    refetch();
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
            <th>image</th>
            <th>Agent Name</th>
            <th>Agent Email</th>
            <th> Price</th>
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
                  {buy.verificationStatus === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleAccept(buy._id)}
                        className="btn btn-xs lg:mb-0 mb-3 btn-primary text-white"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(buy._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <div>
                      {buy.status === "rejected" ? (
                        <span className="text-yellow-300">
                          {buy.verificationStatus}
                        </span>
                      ) : (
                        <span className="text-green-500">
                          {buy.verificationStatus}
                        </span>
                      )}
                    </div>
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
};

export default ManagePropery;
