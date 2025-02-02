import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import UseAuth from "../../AuthProvider/UseAuth";
const Slider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = UseAuth();
  console.log(role);
  const AgentProfile = [
    { name: "Home", path: "/" },
    { name: "Agent Profile", path: "Agent-Profile" },
    { name: "Add Property", path: "add-property" },
    { name: "My Added Properties", path: "my-properties" },
    { name: " Sold Properties", path: "sold-properties" },
    {
      name: "Requested Properties",
      path: "requested-properties",
    },
  ];

  const UserProfile = [
    { name: "Home", path: "/" },
    { name: "My Profile", path: "My-Profile" },
    { name: "Wishlist", path: "Wishlist" },
    { name: "Property Bought", path: "Property-bought" },
    { name: "My Reviews", path: "My-reviews" },
  ];

  const AdminProfile = [
    { name: "Home", path: "/" },
    { name: "Admin Profile", path: "Admin-Profile" },
    { name: "Manage Properties", path: "Manage-Propertiesy" },
    { name: "Manage Users", path: "Manage-Users" },
    { name: "Manage Reviews", path: "Manage-Reviews" },
    { name: "Advertise property", path: "Advertise-property" },
  ];
  // Admin Profile.
  // Manage Properties.
  // Manage Users.
  // Manage reviews.

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="bg-purple-800 text-white flex justify-between px-4 py-3 md:hidden w-full">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "" : <FaBars />}
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static bg-purple-800 text-white w-64 h-full transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-2xl font-bold text-center py-4 hidden md:block">
          Dashboard
        </h2>
        <div className="bg-purple-800 text-white flex justify-between px-4 py-3 md:hidden">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : ""}
          </button>
        </div>
        <nav className="flex flex-col space-y-2 px-4">
          {role === "agent" &&
            AgentProfile.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-600"
                  }`
                }
                onClick={() => setIsOpen(false)} // Close menu on click (mobile)
              >
                {item.name}
              </NavLink>
            ))}

          {role === "user" &&
            UserProfile.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-600"
                  }`
                }
                onClick={() => setIsOpen(false)} // Close menu on click (mobile)
              >
                {item.name}
              </NavLink>
            ))}

          {role === "admin" &&
            AdminProfile.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-600"
                  }`
                }
                onClick={() => setIsOpen(false)} // Close menu on click (mobile)
              >
                {item.name}
              </NavLink>
            ))}
        </nav>
      </div>

      {/* Background overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Slider;
