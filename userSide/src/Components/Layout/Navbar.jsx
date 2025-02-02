import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../AuthProvider/UseAuth";

function Navbar() {
  const { user, logOut, role } = useAuth();
  const [toggle, setToggle] = useState(false); // Toggle for mobile menu
  const [dropdown, setDropdown] = useState(false); // Toggle for dropdown menu
  const navigate = useNavigate();

  const logoutFunc = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-4 py-4 fixed z-50 w-full bg-purple-950 text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <h2 className="text-white">HomeHaven</h2>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-gray-300 ${isActive ? "text-yellow-300" : "text-white"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/allProperties"
          className={({ isActive }) =>
            `hover:text-gray-300 ${isActive ? "text-yellow-300" : "text-white"}`
          }
        >
          All Properties
        </NavLink>
        {role === "user" && (
          <NavLink
            to="/deshboard/user"
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "text-yellow-300" : "text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
        )}
        {role === "agent" && (
          <NavLink
            to="/deshboard/agent"
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "text-yellow-300" : "text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
        )}
        {role === "admin" && (
          <NavLink
            to="/deshboard/admin"
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "text-yellow-300" : "text-white"
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        )}
        {role === "fraud" && (
          <NavLink
            to="/deshboard/fraud"
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "text-yellow-300" : "text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
        )}
      </div>

      {/* Login/Logout Button */}
      <div className="hidden md:flex items-center">
        {user ? (
          <>
            <div className="relative">
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full mr-4 cursor-pointer"
                onClick={() => setDropdown(!dropdown)} // Toggle dropdown
              />
              {dropdown && (
                <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-lg">
                  <button
                    onClick={logoutFunc}
                    className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `bg-green-600 px-4 py-2 rounded ${
                isActive ? "bg-green-500" : "hover:bg-green-500"
              }`
            }
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="text-2xl" onClick={() => setToggle(!toggle)}>
          {toggle ? <IoMdClose /> : <IoMdMenu />}
        </button>

        <AnimatePresence>
          {toggle && (
            <motion.ul
              className="bg-purple-950 text-white mt-2 left-0 py-6 px-4 fixed w-[100%]"
              key="menu"
              exit={{ opacity: 0, x: 50 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <li className="py-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-gray-300 ${
                      isActive ? "text-yellow-300" : "text-white"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  to="/allProperties"
                  className={({ isActive }) =>
                    `hover:text-gray-300 ${
                      isActive ? "text-yellow-300" : "text-white"
                    }`
                  }
                >
                  All Properties
                </NavLink>
              </li>
              {role === "user" && (
                <li className="py-2">
                  <NavLink
                    to="/deshboard/user"
                    className={({ isActive }) =>
                      `hover:text-gray-300 ${
                        isActive ? "text-yellow-300" : "text-white"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {role === "agent" && (
                <li className="py-2">
                  <NavLink
                    to="/deshboard/agent"
                    className={({ isActive }) =>
                      `hover:text-gray-300 ${
                        isActive ? "text-yellow-300" : "text-white"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {role === "admin" && (
                <li className="py-2">
                  <NavLink
                    to="/deshboard/admin"
                    className={({ isActive }) =>
                      `hover:text-gray-300 ${
                        isActive ? "text-yellow-300" : "text-white"
                      }`
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                {role === "fraud" && (
                  <NavLink
                    to="/deshboard/fraud"
                    className={({ isActive }) =>
                      `hover:text-gray-300 ${
                        isActive ? "text-yellow-300" : "text-white"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                )}
              </li>
              <li className="py-2">
                {user ? (
                  <button onClick={logoutFunc}>Logout</button>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `hover:text-gray-300 ${
                        isActive ? "text-yellow-300" : "text-white"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;
