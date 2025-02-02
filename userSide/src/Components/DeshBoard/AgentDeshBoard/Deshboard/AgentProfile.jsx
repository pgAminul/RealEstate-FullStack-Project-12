import React from "react";
import useAuth from "../../../AuthProvider/UseAuth";
import Title from "../../../ReusableCompnents/Title";

export default function Profile() {
  const { user, role } = useAuth();
  const createdAt = user?.reloadUserInfo.createdAt;
  const timestamp = parseInt(createdAt, 10); // Convert to integer
  const date = new Date(timestamp); // Convert to Date object
  const formattedDate = date.toLocaleString();
  return (
    <div className="min-h-screen">
      <div className=" mx-auto  p-6 text-white min-w-3xl  bg-pink-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-gray-200  shadow-lg ">
        <div className="grid  justify-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 mx-auto h-24 rounded-full object-cover"
          />
          <div>
            <div className="mx-auto text-center">
              <h1 className="text-2xl font-bold">
                {user?.displayName || "User Name"}
              </h1>
              <p className="">{user?.email || "user@example.com"}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-medium">Role: </p>
              <p> {role ? role : "Not Verified" || "Not provided"}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Joined On:</p>
              <p>{formattedDate || "Not provided"}</p>
            </div>
            <div>
              <p className="font-medium">Account Verify:</p>
              <p>
                {user?.reloadUserInfo?.emailVerified
                  ? "Verified"
                  : "Not Verified" || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
