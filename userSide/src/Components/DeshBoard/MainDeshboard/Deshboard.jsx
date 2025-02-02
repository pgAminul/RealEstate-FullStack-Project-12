import React from "react";
import Slider from "./Slider";
import { Outlet } from "react-router-dom";
import DeshBoardTitle from "../../ReusableCompnents/DashboardTitle";
import useAuth from "../../AuthProvider/UseAuth";

export default function DeshBoard() {
  const { user, role } = useAuth();

  return (
    <div className="md:flex bg-purple-950">
      {/* Sidebar */}
      <div className="md:w-1/4 ">
        <Slider />
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 p-4">
        <DeshBoardTitle
          title={`Hello ${user?.displayName}`}
          description={`Welcome To Your ${role} Dashboard
      `}
        />
        <Outlet />
      </div>
    </div>
  );
}
