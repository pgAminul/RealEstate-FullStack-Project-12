import React from "react";
import banner from "../../assets/banner4.jpg";

export default function Slider() {
  return (
    <div className="relative">
      <img src={banner} alt="" className="w-full h-[90vh] object-cover" />
      <div className="absolute flex-col inset-0 flex items-center justify-center">
        <h2 className="lg:text-6xl text-4xl text-white">Top Real Estate</h2>
        <h2 className="lg:text-6xl text-4xl text-white  mt-3">
          Fitst to know. First to choose.
        </h2>
        <button className="btn mt-6 text-white px-6 btn-error rounded-2xl ">
          Explore new lanuches now
        </button>
      </div>
    </div>
  );
}
