import React from "react";
import Slider from "../Pages/Slider";
import Advertisement from "../Pages/Advertisement/Advertisement ";
import LatestReview from "../Pages/Reviews/LatestReview";
import OurServices from "../Pages/OurServices/OurServices";
import OurTeam from "../Pages/OurTeam/OurTeam";

export default function Home() {
  return (
    <div className="bg-purple-950">
      <Slider />
      <div className="md:px-8 px-4">
        <Advertisement />
        <LatestReview />
        <OurServices />
        <OurTeam />
      </div>
    </div>
  );
}
