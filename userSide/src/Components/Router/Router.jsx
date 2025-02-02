import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Error from "../Layout/Error";
import Home from "../Layout/Home";
import Navbar from "../Layout/Navbar";
import Login from "../Layout/Login";
import Register from "../Layout/Register";
import Footer from "../Layout/Footer";
import AllPropertie from "../Layout/AllPropertie";
import PrivetRoute from "./PrivetRouter/PrivetRouter";
import useAuth from "../AuthProvider/UseAuth";
import PublicAxios from "../Axios/PublicAxios";
import DeshBoard from "../DeshBoard/MainDeshboard/Deshboard";
import Profile from "../DeshBoard/AgentDeshBoard/Deshboard/AgentProfile";
import AgentRoute from "../Router/PrivetRouter/AgentRoute";
import AddProperty from "../DeshBoard/AgentDeshBoard/Property/AddProperty";
import PropertyDetails from "../Pages/Advertisement/PropertyDetails";
import useAxiosInstance from "../Axios/useaxiosInstance";
import AdminRouter from "./PrivetRouter/AdminRouter";
import MyAddedProperty from "../DeshBoard/AgentDeshBoard/Property/MyAddedProperty";
import UpdateProperties from "../DeshBoard/AgentDeshBoard/Property/UpdateProperties";
import WishList from "../DeshBoard/UserDeshBoard/WishList";
import MakeOffer from "../DeshBoard/UserDeshBoard/MakeOffer";
import PropertyBought from "../DeshBoard/UserDeshBoard/PropertyBought";
import RequestedProerty from "../DeshBoard/AgentDeshBoard/Property/RequestedProperty";
import ManagePropery from "../DeshBoard/AdminDeshBoard/ManageProperty";
import Payment from "../DeshBoard/UserDeshBoard/Payment/Payment";
import MyReview from "../DeshBoard/UserDeshBoard/MyReview";
import SoldProperties from "../DeshBoard/AgentDeshBoard/Property/SoldProperties";
import ManageUser from "../DeshBoard/AdminDeshBoard/ManageUser";
import ManageReview from "../DeshBoard/AdminDeshBoard/ManageReview";
import Advertiseproperty from "../DeshBoard/AdminDeshBoard/Advertiseproperty";

function Layout() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, role, setRole } = useAuth();
  console.log(role);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true);
      try {
        if (user?.email) {
          const response = await axiosInstance.get(`/getRole/${user?.email}`);
          const fetchedData = response.data;
          setData(fetchedData);
          if (fetchedData?.length > 0) {
            setRole(fetchedData[0]?.role);
          }
        }
      } catch (error) {
        console.error("Failed to fetch role:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRole();
    }
  }, [user]);

  const validPaths = [
    "/",
    "/login",
    "/register",
    "/allProperties",
    "/property-details/:id", // Keep dynamic routes in regex-like format
    "/admin",
    "/user",
    "/agent",
    "/error",
  ];

  const isValidPath = validPaths.some((path) =>
    path.includes(":")
      ? location.pathname.startsWith(path.split(":")[0]) // Dynamic route match
      : path === location.pathname
  );
  // if (loading) {
  //   return (
  //     <div className="h-[80vh] flex justify-center items-center">
  //       <span className="loading loading-ring loading-lg"></span>
  //     </div>
  //   );
  // }

  return (
    <>
      {isValidPath && (
        <div className="lg:h-[64px] h-[54px]">
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allProperties" element={<AllPropertie />} />
        <Route
          path="/property-details/:id"
          element={
            <PrivetRoute>
              <PropertyDetails />
            </PrivetRoute>
          }
        />

        {/* user start here  */}

        {role === "user" && (
          <Route
            path="deshboard/user/"
            element={
              <PrivetRoute>
                <DeshBoard />
              </PrivetRoute>
            }
          >
            <Route
              index
              element={
                <PrivetRoute>
                  <Profile />
                </PrivetRoute>
              }
            />
            <Route
              path="My-Profile"
              element={
                <PrivetRoute>
                  <Profile />
                </PrivetRoute>
              }
            />

            <Route
              path="Wishlist"
              element={
                <PrivetRoute>
                  <WishList />
                </PrivetRoute>
              }
            />
            <Route
              path="Offer/:id"
              element={
                <PrivetRoute>
                  <MakeOffer />
                </PrivetRoute>
              }
            />
            <Route
              path="Property-bought"
              element={
                <PrivetRoute>
                  <PropertyBought />
                </PrivetRoute>
              }
            />

            <Route
              path="payment/:id"
              element={
                <PrivetRoute>
                  <Payment />
                </PrivetRoute>
              }
            />

            <Route
              path="My-reviews"
              element={
                <PrivetRoute>
                  <MyReview />
                </PrivetRoute>
              }
            />
          </Route>
        )}

        {/* agent start here  */}

        {role === "agent" && (
          <Route
            path="deshboard/agent"
            element={
              <AgentRoute>
                <DeshBoard />
              </AgentRoute>
            }
          >
            <Route
              index
              element={
                <AgentRoute>
                  <Profile />
                </AgentRoute>
              }
            />
            <Route
              path="Agent-Profile"
              element={
                <AgentRoute>
                  <Profile />
                </AgentRoute>
              }
            />
            <Route
              path="add-property"
              element={
                <AgentRoute>
                  <AddProperty />
                </AgentRoute>
              }
            />
            <Route
              path="my-properties"
              element={
                <AgentRoute>
                  <MyAddedProperty />
                </AgentRoute>
              }
            />
            <Route
              path="/deshboard/agent/Update-details/:id"
              element={
                <AgentRoute>
                  <UpdateProperties />
                </AgentRoute>
              }
            />
            <Route
              path="/deshboard/agent/requested-properties"
              element={
                <AgentRoute>
                  <RequestedProerty />
                </AgentRoute>
              }
            />

            <Route
              path="/deshboard/agent/sold-properties"
              element={
                <AgentRoute>
                  <SoldProperties />
                </AgentRoute>
              }
            />
          </Route>
        )}

        {/* admin start here  */}

        {role === "admin" && (
          <Route
            path="deshboard/admin/"
            element={
              <AdminRouter>
                <DeshBoard />
              </AdminRouter>
            }
          >
            <Route
              index
              element={
                <AdminRouter>
                  <Profile />
                </AdminRouter>
              }
            />

            <Route
              path="Admin-Profile"
              element={
                <AdminRouter>
                  <Profile />
                </AdminRouter>
              }
            />

            <Route
              path="Manage-Propertiesy"
              element={
                <AdminRouter>
                  <ManagePropery />
                </AdminRouter>
              }
            />

            <Route
              path="Manage-Users"
              element={
                <AdminRouter>
                  <ManageUser />
                </AdminRouter>
              }
            />

            <Route
              path="Manage-Reviews"
              element={
                <AdminRouter>
                  <ManageReview />
                </AdminRouter>
              }
            />
            <Route
              path="Advertise-property"
              element={
                <AdminRouter>
                  <Advertiseproperty />
                </AdminRouter>
              }
            />
          </Route>
        )}

        {role === "fraud" && (
          <Route
            path="deshboard/fraud/"
            element={
              <PrivetRoute>
                <DeshBoard />
              </PrivetRoute>
            }
          >
            <Route
              index
              element={
                <PrivetRoute>
                  <Profile />
                </PrivetRoute>
              }
            />
          </Route>
        )}
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>

      {isValidPath && <Footer />}
    </>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
