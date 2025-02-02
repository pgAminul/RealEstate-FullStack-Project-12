import { FcGoogle } from "react-icons/fc";
import register from "../../assets/login.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";
import PublicAxios from "../Axios/PublicAxios";

const Register = () => {
  const { signUp, setUser, updateNewProfile, googleLogin, user } = useAuth();

  const axiosPublic = PublicAxios();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const role = "user";
  const isFraud = false;
  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, email, password, photo } = e.target.elements;
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const photoValue = photo.value.trim();
    const passwordValue = password.value;

    let hasError = false;

    // Validate name
    if (!nameValue) {
      setNameError("Name is required.");
      hasError = true;
    } else {
      setNameError("");
    }

    // Validate email
    if (!emailValue) {
      setEmailError("Email is required.");
      hasError = true;
    } else {
      setEmailError("");
    }

    // Validate photo URL
    if (!photoValue) {
      setPhotoError("Photo URL is required.");
      hasError = true;
    } else {
      setPhotoError("");
    }

    // Validate password
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    if (
      !uppercaseRegex.test(passwordValue) ||
      !lowercaseRegex.test(passwordValue) ||
      !numberRegex.test(passwordValue)
    ) {
      setPasswordError(
        "Password must include at least one uppercase letter, one lowercase letter, and one number."
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    signUp(emailValue, passwordValue)
      .then((res) => {
        const createdUser = res.user;
        const usersData = {
          name: nameValue,
          email: emailValue,
          role,
          isFraud: isFraud,
        };

        updateNewProfile({
          displayName: nameValue,
          photoURL: photoValue,
        })
          .then(() => {
            setUser({
              ...createdUser,
              displayName: nameValue,
              photoURL: photoValue,
            });

            axiosPublic
              .post("/users", usersData)
              .catch((e) => console.log(e.message));

            Swal.fire({
              title: "Registration Successful!",
              text: "Your account has been created successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("Profile update error:", error);
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Already have an account by this email",
          icon: "error",
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
        const usersData = {
          name,
          email,
          role,
          isFraud: isFraud,
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
      className="min-h-screen flex items-center py-8 justify-center bg-gradient-to-r from-purple-700 to-blue-500"
      style={{
        backgroundImage: `url(${register})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
          </div>
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
            />
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block text-white font-medium mb-2"
            >
              Photo URL
            </label>
            <input
              type="url"
              id="photo"
              name="photo"
              className="w-full p-3 border rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your photo URL"
            />
            {photoError && <p className="text-red-500 mt-2">{photoError}</p>}
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
            />
            <div
              className="absolute top-14 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible className="text-white" />
              ) : (
                <AiOutlineEye className="text-white" />
              )}
            </div>
            {passwordError && (
              <p className="text-red-500 mt-2">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            Register
          </button>
          <button
            type="button"
            onClick={googleLoginByClick}
            className="w-full flex items-center justify-center bg-white text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FcGoogle className="mr-2 text-xl" /> Login with Google
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-white">
            Already have an account?
            <NavLink to="/login" className="text-yellow-500 hober:underline">
              Login here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
