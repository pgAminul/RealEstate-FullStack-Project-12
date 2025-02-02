import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import LoginImage from "../../assets/login.jpg";
import useAuth from "../AuthProvider/UseAuth";
import Swal from "sweetalert2";
import PublicAxios from "../Axios/PublicAxios";

const Login = () => {
  const { logIn, setUser, googleLogin } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const axiosPublic = PublicAxios();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    // if (!validatePassword(password.value)) {
    //   setPasswordError(
    //     "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    //   );
    //   return;
    // }

    setPasswordError(""); // Clear the error message if validation passes

    logIn(email.value, password.value)
      .then((res) => {
        setUser(res.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You have successfully logged in.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(from);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      });
  };
  const googleLoginByClick = () => {
    googleLogin()
      .then((result) => {
        setUser(result.user);
        navigate("/");
        const name = result.user?.displayName;
        const email = result.user?.email;
        const role = "user";
        const usersData = {
          name,
          email,
          role,
        };
        axiosPublic
          .post("/users", usersData)
          .catch((e) => console.log(e.message));
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-blue-500"
      style={{
        backgroundImage: `url(${LoginImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogIn}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-white font-medium mb-2"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              className="w-full p-3 border rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <div
              className="absolute top-14 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible className="text-white" />
              ) : (
                <AiOutlineEye className="text-white" />
              )}
            </div>
            {passwordError && (
              <p className="text-red-500 mt-2 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            Login
          </button>
          <button
            onClick={googleLoginByClick}
            type="button"
            className="w-full flex items-center justify-center bg-white text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FcGoogle className="mr-2 text-xl" /> Login with Google
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-white">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-yellow-500 hover:underline">
              Register here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
