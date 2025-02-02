import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <div className="flex items-center justify-center ">
        <img
          src="https://img.icons8.com/?size=100&id=K39HZ9lwqjSk&format=png&color=000000"
          alt=""
        />
        <h2 className="text-3xl font-bold text-red-600">OPPSS! Can't Find</h2>
      </div>
      <div>
        <button
          className="btn flex items-center text-2xl mt-3 btn-error text-white "
          onClick={() => navigate(-1)}
        >
          <FaBackward />
          Go Back
        </button>
      </div>
    </div>
  );
}
