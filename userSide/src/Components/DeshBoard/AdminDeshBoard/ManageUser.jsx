import React from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Axios/useaxiosInstance";

export default function ManageUser() {
  const axiosSecure = useAxiosInstance();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axiosSecure.get("/allUsers");
      return response.data;
    },
  });

  const handleButtonClick = async (action, email) => {
    try {
      if (action === "deleteUser") {
        const confirmDelete = await Swal.fire({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        });

        if (confirmDelete.isConfirmed) {
          await axiosSecure.post("/deleteUser", { email });

          Swal.fire(
            "Deleted!",
            `User with email ${email} has been deleted.`,
            "success"
          );
        }
      } else {
        const response = await axiosSecure.post("/update-status", {
          action,
          email,
        });

        Swal.fire(
          "Success!",
          `Action "${action}" performed on ${email}.`,
          "success"
        );
      }

      refetch();
    } catch (error) {
      Swal.fire(
        "Success!",
        `Action "${action}" performed on ${email}.`,
        "success"
      );
    }
    refetch();
  };

  return (
    <div
      className={`${
        users.length === 0 ? "h-[80vh] flex justify-center items-center" : ""
      }`}
    >
      {users.length === 0 ? (
        <h2 className="text-white text-4xl font-bold">No Users Found</h2>
      ) : (
        <div
          className={`overflow-x-auto ${
            users.length < 7 ? "h-[80vh]" : "h-auto"
          }`}
        >
          <table className="table text-white">
            <thead>
              <tr className="text-white">
                <th>No</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.email}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "fraud" ? (
                      <span className="text-white rounded-md bg-red-500 p-2 font-bold">
                        {user.role}
                      </span>
                    ) : (
                      <span>{user.role}</span>
                    )}
                  </td>
                  <td>
                    {/* Buttons based on role */}
                    {user.role === "agent" ? (
                      <div className="flex">
                        <button
                          className="btn mx-2 w-36 btn-sm bg-black hover:bg-slate-900 text-white border-none"
                          onClick={() =>
                            handleButtonClick("makeAdmin", user.email)
                          }
                        >
                          Make Admin
                        </button>
                        <button
                          className="btn mx-2 w-36 btn-sm bg-black hover:bg-slate-900 text-white border-none"
                          onClick={() =>
                            handleButtonClick("markFraud", user.email)
                          }
                        >
                          Mark as Fraud
                        </button>
                        <button
                          className="btn mx-2 w-36 btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
                          onClick={() =>
                            handleButtonClick("deleteUser", user.email)
                          }
                        >
                          Delete User
                        </button>
                      </div>
                    ) : user.role === "user" ? (
                      <div className="flex">
                        <button
                          className="btn mx-2 w-36 btn-sm bg-black hover:bg-slate-900 text-white border-none"
                          onClick={() =>
                            handleButtonClick("makeAgent", user.email)
                          }
                        >
                          Make Agent
                        </button>
                        <button
                          className="btn mx-2 w-36 btn-sm bg-black hover:bg-slate-900 text-white border-none"
                          onClick={() =>
                            handleButtonClick("makeAdmin", user.email)
                          }
                        >
                          Make Admin
                        </button>
                        <button
                          className="btn mx-2 w-36 btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
                          onClick={() =>
                            handleButtonClick("deleteUser", user.email)
                          }
                        >
                          Delete User
                        </button>
                      </div>
                    ) : user.role === "admin" ? (
                      <div className="flex">
                        <button
                          className="btn mx-2 w-36 btn-sm bg-black hover:bg-slate-900 text-white border-none"
                          onClick={() =>
                            handleButtonClick("removeAdmin", user.email)
                          }
                        >
                          Remove Admin
                        </button>
                        <button
                          className="btn mx-2 w-36 btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
                          onClick={() =>
                            handleButtonClick("deleteUser", user.email)
                          }
                        >
                          Delete User
                        </button>
                      </div>
                    ) : user.role === "fraud" ? (
                      <div className="flex">
                        <button
                          className="btn mx-2 w-36 btn-sm bg-black hover:bg-slate-900 text-white border-none"
                          onClick={() =>
                            handleButtonClick("makeAgent", user.email)
                          }
                        >
                          Make Agent
                        </button>
                        <button
                          className="btn mx-2 w-36 btn-sm bg-black hover:bg-slate-900 text-white border-none"
                          onClick={() =>
                            handleButtonClick("makeAdmin", user.email)
                          }
                        >
                          Make Admin
                        </button>
                        <button
                          className="btn mx-2 w-36 btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
                          onClick={() =>
                            handleButtonClick("deleteUser", user.email)
                          }
                        >
                          Delete User
                        </button>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
